'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateActions = exports.decorateHandlers = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mapKeys = require('lodash/mapKeys');

var _mapKeys2 = _interopRequireDefault(_mapKeys);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var decorateHandlers = exports.decorateHandlers = function decorateHandlers(reducers, label) {
  var decorate = function decorate(handlers) {
    return (0, _mapKeys2.default)(handlers, function (handler, action) {
      return label ? label + '/' + action : action;
    });
  };

  var decoratedHandlers = (0, _isArray2.default)(reducers) ? reducers.reduce(function (r1, r2) {
    return _extends({}, decorate(r1), decorate(r2));
  }) : decorate(reducers);

  return decoratedHandlers;
};

var decorateActions = exports.decorateActions = function decorateActions(actionCreators, dispatch, labels) {
  var decorateAction = function decorateAction(action) {
    if ((0, _isArray2.default)(labels)) {
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

  return (0, _mapValues2.default)(actionCreators, function (actionCreator) {
    return decorate(actionCreator);
  });
};