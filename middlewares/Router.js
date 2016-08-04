var _ = require('lodash');
_.mixin(require('lodash-inflection'));

var routeMapper = CONFIG.router;

var router = global.neonode.express.Router();

logger.info('Loading routes...');

logger.info('Routes')

var _helpers = [];

routeMapper.routes.forEach(function(route) {
  var _handler = route.handler.slice();

  // save named callback
  _helpers.push(route.as);

  var verbs      = [route.verb];
  var action     = route._actionName || _handler.pop();
  var controller = route._resourceName || _handler.pop();

  verbs.forEach(function(verb) {
    logger.info((verb.toUpperCase() + '      ').substr(0, 7) + ' ' + route.path + '   ' + controller + '#' + action);

    var controllerObject = neonode.controllers[controller];
    var controllerMethod = controllerObject && controllerObject[action];
    var beforeActions    = controllerObject && controllerObject.constructor.beforeActions || [];

    if (!controllerObject) {
      throw new Error('Controller `' + controller + '` is missing');
    }

    if (!controllerMethod) {
      throw new Error('Action `' + action + '` for `' + controller + '` is missing');
    }

    var args = [];

    /* Get the beforeActions from the controller and filter the ones that
       match the current route.action and flatten the result*/
    if (beforeActions.length > 0) {
      var filters = _.flatten(beforeActions.filter(function(item) {
        if (item.actions.indexOf(action) !== -1) {
          return true;
        }
      }).map(function(item) {
        return item.before;
      }));


      filters.forEach(function(filter) {
        if (_.isString(filter)) { // if is string look for the method in the same controller
          if (neonode.controllers[controller][filter]) {
            args.push(neonode.controllers[controller][filter]);
          } else {
            throw new Error('BeforeActions Error: Unknown method ' + filter + ' in ' + controller);
          }
        } else if (_.isFunction(filter)) { // if is a function just add it to the middleware stack
          args.push(filter);
        } else {
          throw new Error('Invalid BeforeAction ' + filter);
        }
      });
    }

    // TODO: route-mappings should provide this detail!
    var resourceName = route.handler[route.handler.length - 1];

    // append built middleware for this resource
    // if (ACL && ACL.middlewares[resourceName] && ACL.middlewares[resourceName][route.action]) {
    //   args.push(ACL.middlewares[resourceName][route.action]);
    // }

    args.push(controllerMethod);

    router.route(route.path)[verb](args);
  });
});

logger.info("---------------------------------");
logger.info('\n');

logger.info('Route Helpers:');

_helpers.forEach(function(fn) {
  logger.info('  ' + fn + '.url()');
});

logger.info('\n');

module.exports = router;
