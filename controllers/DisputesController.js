/* globals Dispute, RestfulController, Class, DisputeTool, CONFIG, DisputeStatus,
    UserMailer, NotFoundError, DisputeRenderer, Dispute, logger */
const Promise = require('bluebird');
const marked = require('marked');
const _ = require('lodash');
const { BadRequest } = require('../lib/errors');
const { CompletedDisputeEmail, MemberUpdatedDisputeEmail } = require('../services/email');

const authenticate = require('../services/authentication');
const authorize = require('../services/authorization');

const DisputesController = Class('DisputesController').inherits(RestfulController)({
  beforeActions: [
    {
      before: [authenticate],
      actions: ['*'],
    },
    {
      before: [
        '_loadDispute',
        authorize((req, res) => req.user.id === res.locals.dispute.userId || req.user.admin),
      ],
      actions: [
        'show',
        'edit',
        'update',
        'updateSubmission',
        'updateDisputeData',
        'setSignature',
        'download',
        'addAttachment',
        'removeAttachment',
        'destroy',
      ],
    },
  ],
  prototype: {
    async _loadDispute(req, res, next) {
      try {
        const dispute = await Dispute.findById(
          req.params.id,
          '[user, statuses, attachments, disputeTool]',
        );

        if (!dispute) throw new NotFoundError();

        dispute.statuses = _.sortBy(dispute.statuses, 'createdAt');

        // Used in template
        const optionData = dispute.disputeTool.data.options[dispute.data.option];
        if (optionData && optionData.more) {
          optionData.more = marked(optionData.more);
        }

        req.dispute = res.locals.dispute = dispute;
        next();
      } catch (e) {
        next(e);
      }
    },

    show(req, res) {
      res.locals.lastStatus = req.dispute.statuses.filter(status => {
        if (status.status !== 'User Update') {
          return true;
        }

        return false;
      })[0];

      if (req.user && req.user.id === req.dispute.userId) {
        res.render('disputes/show');
      } else {
        res.render('disputes/showForVisitor');
      }
    },

    async create(req, res, next) {
      try {
        if (!(req.body.disputeToolId && req.body.option)) {
          throw new BadRequest();
        }

        const dispute = await Dispute.createFromTool({
          user: req.user,
          disputeToolId: req.body.disputeToolId,
          option: req.body.option,
        });

        res.redirect(CONFIG.router.helpers.Disputes.show.url(dispute.id));
      } catch (e) {
        next(e);
      }
    },

    update(req, res, next) {
      const dispute = res.locals.dispute;

      const { comment } = req.body;

      const ds = new DisputeStatus({
        comment,
        disputeId: dispute.id,
        status: 'User Update',
      });

      ds
        .save()
        .then(async () => {
          const email = new MemberUpdatedDisputeEmail(req.user, dispute, ds);
          try {
            await email.send();
            logger.info('Successfully sent dispute updated email to organizers', email.toString());
          } catch (e) {
            logger.error(
              'Failed to send dispute update email to organizers',
              e.message,
              e.stack,
              email.toString(),
            );
          }
        })
        .then(() => dispute.save())
        .then(() => res.redirect(CONFIG.router.helpers.Disputes.show.url(dispute.id)))
        .catch(next);
    },

    async updateSubmission(req, res) {
      const dispute = res.locals.dispute;
      const pendingSubmission = req.body.pending_submission === '1';

      try {
        await dispute.markAsCompleted(pendingSubmission);
      } catch (e) {
        req.flash(
          'error',
          'An error occurred while completing your dispute. Please try again. If the problem persists, contact a Debt Syndicate organizer for assistance.',
        );
        logger.error('Unable to mark dispute as completed', e.message, e.stack);
      }

      const email = new CompletedDisputeEmail(req.user, dispute);

      try {
        await email.send();
        req.flash(
          'success',
          'Thank you for disputing your debt. A copy of your dispute has been sent to your email.',
        );
      } catch (e) {
        req.error(
          'error',
          'Your dispute was successfully saved. However, an error was encountered while sending the confirmation email. Please contact a Debt Syndicate organizer to resolve this error.',
        );
        logger.error(
          'Unable to send email upon dispute completion',
          e.message,
          e.stack,
          email.toString(),
        );
      }

      res.redirect(CONFIG.router.helpers.Disputes.show.url(req.params.id));
    },

    updateDisputeData(req, res, next) {
      const dispute = res.locals.dispute;

      const commands = ['setForm', 'setDisputeProcess', 'setConfirmFollowUp'];

      if (!commands.includes(req.body.command)) {
        return next(new BadRequest());
      }

      try {
        dispute[req.body.command](req.body);
      } catch (e) {
        return res.format({
          html() {
            req.flash('error', `${e.toString()} (on #${req.body.command})`);
            return res.redirect(CONFIG.router.helpers.Disputes.show.url(dispute.id));
          },
          json() {
            return res.json({ error: e.toString() });
          },
        });
      }

      return dispute
        .save()
        .then(() =>
          res.format({
            html() {
              return res.redirect(CONFIG.router.helpers.Disputes.show.url(dispute.id));
            },
            json() {
              return res.json({ status: 'confirmed' });
            },
          }),
        )
        .catch(next);
    },

    setSignature(req, res, next) {
      const dispute = res.locals.dispute;

      if (!req.body.signature) return next(new BadRequest());

      dispute
        .setSignature(req.body.signature)
        .then(() => res.redirect(CONFIG.router.helpers.Disputes.show.url(dispute.id)))
        .catch(e => {
          req.flash('error', `${e.toString()} (on #setSignature)`);
          return res.redirect(CONFIG.router.helpers.Disputes.show.url(dispute.id));
        });
    },

    async addAttachment(req, res, next) {
      const dispute = res.locals.dispute;

      if (!req.files || !req.files.attachment) {
        return next(new BadRequest());
      }

      try {
        await Promise.each(req.files.attachment, attachment =>
          dispute.addAttachment(req.body.name, attachment.path),
        );
        await dispute.save();
        req.flash('success', 'Attachment successfully saved to your dispute');
      } catch (e) {
        req.flash(
          'error',
          'A problem occurred while attempting to upload your attachments. Please try again, and if the problem persists, contact a Debt Syndicate organizer.',
        );
        logger.error('Unable to upload attachment', e.message);
      }

      return res.redirect(CONFIG.router.helpers.Disputes.show.url(dispute.id));
    },

    removeAttachment(req, res) {
      const dispute = res.locals.dispute;

      if (!req.params.attachment_id) {
        req.flash('error', 'Missing attachment id');
        return res.redirect(CONFIG.router.helpers.Disputes.show.url(dispute.id));
      }

      return dispute
        .removeAttachment(req.params.attachment_id)
        .then(() => {
          req.flash('success', 'Attachment removed');
          return res.redirect(CONFIG.router.helpers.Disputes.show.url(dispute.id));
        })
        .catch(err => {
          req.flash('error', err.message);
          return res.redirect(CONFIG.router.helpers.Disputes.show.url(dispute.id));
        });
    },

    download(req, res, next) {
      const { dispute } = res.locals;

      const getUrl = renderer => {
        if (Array.isArray(renderer)) renderer = renderer[0];

        const original = renderer.zip.url('original');

        if (!original) {
          return next(new NotFoundError('File is corrupted'));
        }

        return res.redirect(original);
      };

      /**
       * True if {@param renderer} is <code>undefined</code>, if the current status
       * is <code>'Incomplete'</code>; false otherwise as the dispute, upon being
       * moved to the <code>'Completed'</code> status, will immediately trigger its
       * own rendering (so if its <code>'Completed'</code> then the most recent render
       * will always have occurred after the status changed to <code>'Completed'</code>).
       *
       * @param {any|undefined} renderer The most recent render
       * @return {boolean}
       */
      const shouldRender = renderer => {
        if (!renderer) {
          return true;
        }

        const currentStatus = _.sortBy(dispute.statuses, 'updatedAt').slice(-1)[0];

        return currentStatus.status !== 'Completed' || currentStatus.updatedAt > renderer.updatedAt;
      };

      DisputeRenderer.query()
        .where({
          dispute_id: dispute.id,
        })
        .orderBy('updated_at', 'desc')
        .limit(1)
        .then(([renderer]) => {
          if (shouldRender(renderer)) {
            const newRenderer = new DisputeRenderer({
              disputeId: dispute.id,
            });

            return newRenderer
              .save()
              .catch(next)
              .then(() =>
                newRenderer.render(dispute).then(() =>
                  DisputeRenderer.query()
                    .where({ id: newRenderer.id })
                    .include('attachments')
                    .then(([_disputeRenderer]) =>
                      newRenderer
                        .buildZip(_disputeRenderer)
                        .catch(next)
                        .then(id =>
                          DisputeRenderer.query()
                            .where({ id })
                            .limit(1)
                            .orderBy('updated_at', 'desc')
                            .then(getUrl),
                        ),
                    ),
                ),
              );
          }

          return getUrl(renderer);
        });
    },

    destroy(req, res, next) {
      res.locals.dispute
        .destroy()
        .then(() => {
          req.flash('warning', 'The Dispute you started has been deactivated.');
          return res.redirect(CONFIG.router.helpers.DisputeTools.url());
        })
        .catch(next);
    },
  },
});

module.exports = new DisputesController();
