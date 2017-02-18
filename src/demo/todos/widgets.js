import _ from 'lodash';
import { decorateHandlers } from '../../';
import asyncHandlers from '../shared-widgets/async';
import { handleActions } from 'redux-actions';

const ON_SELECT = 'ON_SELECT';

const initialState = {
  isFetching: false
};

const handlers = {
  [ON_SELECT](state, action) {
    const index = _.findIndex(state.payload, todo => todo.id === action.id);
    const payload = state.payload.slice(0, index)
        .concat({...state.payload[index], completed: !state.payload[index].completed})
        .concat(state.payload.slice(index + 1));
    return {
      ...state,
      payload
    };
  }
};

export default handleActions(decorateHandlers({...asyncHandlers, ...handlers}, 'todos'), initialState);

export const onSelect = id => ({
  type: ON_SELECT,
  id
});

export * from '../shared-widgets/async';
