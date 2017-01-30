export const decorateHandlers = (reducers, label) => {
  label = label ? `${label}/` : '';
  const decorate1 = handlers =>
    Object.keys(handlers)
    .reduce((handler, actionType) => ({
      ...handler,
      ...{[`${label}${actionType}`]: handlers[actionType]}
    }), {});

  return decorate1(reducers);
};

export const decorateActions = (actionCreators, dispatch, labels) => {
  const decorateAction = action => {
    if (Array.isArray(labels)) {
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

  return Object.keys(actionCreators)
    .reduce((actionCreator, key) => ({
      ...actionCreator,
      ...{[key]: decorate(actionCreators[key])}
    }), {});
};
