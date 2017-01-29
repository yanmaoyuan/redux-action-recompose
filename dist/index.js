'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateActions = exports.decorateHandlers = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var decorateHandlers = exports.decorateHandlers = function decorateHandlers(reducers, label) {
  var decorate = function decorate(handlers) {
    return _lodash2.default.mapKeys(handlers, function (handler, action) {
      return label ? label + '/' + action : action;
    });
  };

  var decoratedHandlers = _lodash2.default.isArray(reducers) ? reducers.reduce(function (r1, r2) {
    return _extends({}, decorate(r1), decorate(r2));
  }) : decorate(reducers);

  return decoratedHandlers;
};

var decorateActions = exports.decorateActions = function decorateActions(actionCreators, dispatch, labels) {
  var decorateAction = function decorateAction(action) {
    if (_lodash2.default.isArray(labels)) {
      labels.forEach(function (label) {
        return dispatch(_extends({}, action, { type: (label ? label + '/' : '') + action.type }));
      });
    } else {
      dispatch(_extends({}, action, { type: (labels ? labels + '/' : '') + action.type }));
    }
  };

  var decorate = function decorate(actionCreator) {
    return function () {
      var results = actionCreator.apply(undefined, arguments);
      // handle thunk middleware
      if (typeof results === 'function') {
        results(decorateAction);
      } else {
        decorateAction(results);
      }
    };
  };

  return _lodash2.default.mapValues(actionCreators, function (actionCreator) {
    return decorate(actionCreator);
  });
};