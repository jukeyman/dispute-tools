/* globals CONFIG */

const {
  createUser,
  testGet,
  testUnauthenticated,
  testAllowed,
  testForbidden,
} = require('../../utils');

const {
  router: { helpers: urls },
  discourse: { adminRole },
} = CONFIG;

describe('Admin.UsersController', () => {
  let user;
  let admin;
  let disputeAdmin;
  let moderator;

  before(async () => {
    user = await createUser();
    admin = await createUser({ admin: true });
    disputeAdmin = await createUser({ groups: [{ name: adminRole }] });
    moderator = await createUser({ moderator: true });
  });

  describe('index', () => {
    let url;

    before(() => {
      url = `${urls.Admin.Users.url()}?externalId=${user.externalId}`;
    });

    describe('authorization', () => {
      describe('when unauthenticated', () => {
        it('should redirect to login', () => testUnauthenticated(testGet(url)));
      });

      describe('when user', () => {
        it('should reject', () => testForbidden(testGet(url, user)));
      });

      describe('when admin', () => {
        it('should allow', () => testAllowed(testGet(url, admin)));
      });

      describe('when dispute admin', () => {
        it('should allow', () => testAllowed(testGet(url, disputeAdmin)));
      });

      describe('when moderator', () => {
        it('should reject', () => testForbidden(testGet(url, moderator)));
      });
    });
  });
});
