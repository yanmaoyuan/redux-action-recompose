import _ from 'lodash';

export const decorateHandlers = (reducers, label) => {
  const decorate = handlers => _.mapKeys(handlers, (handler, action) => label ? `${label}/${action}` : action);

  const decoratedHandlers = _.isArray(reducers) ?
    reducers.reduce((r1, r2) => ({...decorate(r1), ...decorate(r2)})) : decorate(reducers);

  return decoratedHandlers;
};

export const decorateActions = (actionCreators, dispatch, labels) => {
  const decorateAction = action => {
    if (_.isArray(labels)) {
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

  return _.mapValues(actionCreators, actionCreator => decorate(actionCreator));
};
