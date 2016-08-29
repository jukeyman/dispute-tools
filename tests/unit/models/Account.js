/* globals User, Account, CONFIG */

const expect = require('chai').expect;
const uuid = require('uuid');
const path = require('path');

const truncate = require(path.join(process.cwd(), 'tests', 'utils', 'truncate'));

describe('Account', () => {
  after(() => {
    truncate([Account, User]);
  });

  describe('Validations', () => {
    describe('userId', () => {
      it('Sould fail if userId is not set', () => {
        const account = new Account({});

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.userId.message).to.be.equal('The userId is required');
          });
      });

      it('Sould pass if userId is set', () => {
        const account = new Account({
          userId: uuid.v4(),
        });

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.userId).to.be.undefined;
          });
      });
    });

    describe('collectiveId', () => {
      it('Sould fail if collectiveId is not set', () => {
        const account = new Account({});

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.collectiveId.message).to.be.equal('The collectiveId is required');
          });
      });

      it('Sould pass if collectiveId is set', () => {
        const account = new Account({
          collectiveId: uuid.v4(),
        });

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.collectiveId).to.be.undefined;
          });
      });
    });

    describe('fullname', () => {
      it('Sould fail if fullname is not set', () => {
        const account = new Account({});

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.fullname.message).to.be.equal('The fullname is required');
          });
      });

      it('Sould pass if fullname is set', () => {
        const account = new Account({
          fullname: 'Example Account Fullname',
        });

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.fullname).to.be.undefined;
          });
      });
    });

    describe('state', () => {
      it('Sould fail if state is not set', () => {
        const account = new Account({});

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.state.message).to.be.equal('The state is required');
          });
      });

      it('Sould fail if state is invalid', () => {
        const account = new Account({
          state: 'Jalisco',
        });

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.state.message).to.be.equal('The Account\'s state is invalid.');
          });
      });

      it('Sould pass if state is set', () => {
        const account = new Account({
          state: 'Texas',
        });

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.state).to.be.undefined;
          });
      });
    });

    describe('zip', () => {
      it('Sould fail if zip is not set', () => {
        const account = new Account({});

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.zip.message).to.be.equal('The zip is required');
          });
      });

      it('Sould fail if zip is invalid', () => {
        const account = new Account({
          zip: '123456',
        });

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.zip.message).to.be.equal('The Account\'s zip code is invalid.');
          });
      });

      it('Sould pass if zip is set', () => {
        const account = new Account({
          zip: '90210',
        });

        return account.save()
          .then(() => {
            expect.fail('Should have rejected');
          })
          .catch((err) => {
            expect(err.errors.zip).to.be.undefined;
          });
      });
    });
  });

  describe('Relations', () => {
    describe('user', () => {
      it('Should return a valid User model', () => {
        const user = new User({
          email: 'user@example.com',
          password: '12345678',
          role: 'Admin',
        });

        return user.save().then(() => {
          const account = new Account({
            userId: user.id,
            collectiveId: uuid.v4(),
            fullname: 'Example Account Name',
            bio: '',
            state: 'Texas',
            zip: '73301',
          });

          return account.save().then(() => {
            return Account.query().include('user');
          });
        })
        .then((result) => {
          expect(result[0].user).to.be.instanceof(User);
        });
      });
    });
  });
});
