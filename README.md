Redux Action Recompose
=========================
A simple, flexible and easily portable library for reusing action-creators and reducers in a redux application. Redux Action Recompose allows you to easily share and reuse action-creators and reducers. In addition, it allows you to easily compose and create sets of action-creators and reducers according to each specific module.

## Installation

```
npm install --save redux-action-recompose
```

## Documentation

### Namespace action creators and reducers
In the example below, there are two separate modules (todos, users) that both requires the fetching logic. Redux Action Recompose enables you to namespace such shared action-creators and reducers, so that each specific module gets its own unique version of the action-creators and reducers while sharing the same code. Note: the code follows [The Ducks File Structure for Redux](https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c#.s9w4e07mi)
`action-creator and reducer`
```
// shared/async-widgets.js
export const fetchData = url => {
  return dispatch => {
    dispatch({type: 'FETCH_DATA_REQUEST'});
    axios.get(...)
     .then((payload) => dispatch({type: 'FETCH_DATA_RESPONSE', payload}));
  };
};

const asyncHandlers = {
  ['FETCH_DATA_REQUEST'](state) {
    ...state,
    isFetching: true
  },
  ['FETCH_DATA_RESPONSE'](state, action) {
    ...state,
    isFetching: false,
    payload: action.payload
  }
};
export default asyncHandlers;
```

`configure reducer`
```
import { decorateHandlers } from 'redux-action-recompose';
import { handleActions } from 'redux-actions';
import asyncHandlers from 'shared/async-widgets';

const store = createStore(
    // as oppose to: handleActions(asyncHandlers, {...});
    todos: handleActions(decorateHandlers(asyncHandlers, 'todos'), {...});
);
```
`configure action-creator`
```
import {decorateActions} from 'redux-action-recompose'
import * as actions from 'shared/async-widets'

const mapDispatchToProps = dispatch => ({
  // as oppose to: bindActionCreators(actions, dispatch)
  decoratedActions: decorateActions(actions, dispatch, 'todos')
});
```
You are all set.

1. Now all of the action types that are dispatched under decoratedActions will be namespaced. For example, when you call `decoratedActions.fetchData()`, it will now dispatch `{type: 'todos/FETCH_DATA_REQUEST'}` and `{type: 'todos/FETCH_DATA_RESPONSE', payload}`

2. All of the decorated reducers are also namespaced. The reducer above will be listening for `['todos/FETCH_DATA_REQUEST'](state) {...}` and `['todos/FETCH_DATA_RESPONSE'](state, action) {...}`

now you can easily reuse the action-creator and reducer for other modules simply by decorating them with a different namespace. For instance:
```
const store = createStore(
    todos: handleActions(decorateHandlers(asyncHandlers, 'todos'), {...}),
    users: handleActions(decorateHandlers(asyncHandlers, 'users'), {...})
);
// in todos/index.js
const mapDispatchToProps = dispatch => ({
  decoratedActions: decorateActions(actions, dispatch, 'todos')
});
// in users/index.js
const mapDispatchToProps = dispatch => ({
  decoratedActions: decorateActions(actions, dispatch, 'users')
});
```

### Compose action creators and reducers
Another powerful feature for Redux Action Recompose is the ability for each of your component to cherry pick and compose action creators and reducers.
For example, with the todos module above, now you need the ability to toggle the state of each todo. This is made very simple with Redux Action Recompose.
```
// todos/widgets.js
import asyncHandlers from '../shared/async-widgets';

const todoHandlers = {
    ['ON_TOGGLE'](state, action) {...}
}

export const onToggle = id => ({
  type: 'ON_SELECT',
  id
});

// also exporting all of the action-creators from async-widgets.js
export * from '../shared/async-widgets';

// combining asyncHandlers with todo handlers
export default handleActions(decorateHandlers({...asyncHandlers, ...todoHandlers}, 'todos'), initialState);
```
Now you can do
```
import todoReducers from 'todos/widgets';
const store = createStore(
    // Note: todo reducer includes both asyncHandlers as well as todoHandlers
    todos: todoReducers,
    ...
);

// todos/index.js
import * as todoActions from 'todos/widgets';
const mapDispatchToProps = dispatch => ({
  // Note: todoActions includes both onToggle as well as fetchData
  ...decorateActions(todoActions, dispatch, 'todos')
});
```

## Additional Functionalities
`decorateActions(actions, dispatch, ['a', 'b', 'c', ...])` will dispatch one action for each namespace in the array

`decorateHandlers([asyncHandlers, todoHandlers], initialState)` same as `decorateHandlers({...asyncHandlers, ...todoHandlers})`

## License

MIT
