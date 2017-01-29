import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import isArray from 'lodash/isArray';

export const decorateHandlers = (reducers, label) => {
  const decorate = handlers => mapKeys(handlers, (handler, action) => label ? `${label}/${action}` : action);

  const decoratedHandlers = isArray(reducers) ?
    reducers.reduce((r1, r2) => ({...decorate(r1), ...decorate(r2)})) : decorate(reducers);

  return decoratedHandlers;
};

export const decorateActions = (actionCreators, dispatch, labels) => {
  const decorateAction = action => {
    if (isArray(labels)) {
      labels.forEach(label => dispatch({...action, type: (label ? `${label}/` : '') + action.type}));
    } else {
      dispatch({...action, type: (labels ? `${labels}/` : '') + action.type});
    }
  };

  const decorate = actionCreator => {
    return function() {
      const results = actionCreator(...arguments);
      // handle thunk middleware
      if(typeof results === 'function') {
        results(decorateAction);
      } else {
        decorateAction(results);
      }
    };
  };

  return mapValues(actionCreators, actionCreator => decorate(actionCreator));
};
