'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var decorateHandlers = exports.decorateHandlers = function decorateHandlers(reducers, label) {
  label = label ? label + '/' : '';
  var decorate1 = function decorate1(handlers) {
    return Object.keys(handlers).reduce(function (handler, actionType) {
      return _extends({}, handler, _defineProperty({}, '' + label + actionType, handlers[actionType]));
    }, {});
  };

  return decorate1(reducers);
};

var decorateActions = exports.decorateActions = function decorateActions(actionCreators, dispatch, labels) {
  var decorateAction = function decorateAction(action) {
    if (Array.isArray(labels)) {
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
        dispatch(function (_dispatch, getState, extraArgument) {
          return results(decorateAction, getState, extraArgument);
        });
      } else {
        decorateAction(results);
      }
    };
  };

  return Object.keys(actionCreators).reduce(function (actionCreator, key) {
    return _extends({}, actionCreator, _defineProperty({}, key, decorate(actionCreators[key])));
  }, {});
};