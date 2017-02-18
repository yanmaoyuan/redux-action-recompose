import { decorateHandlers } from '../../';
import asyncHandlers from '../shared-widgets/async';
import { handleActions } from 'redux-actions';

const initialState = {
  isFetching: false
};

export default handleActions(decorateHandlers(asyncHandlers, 'users'), initialState);

export * from '../shared-widgets/async';
