import {combineReducers} from 'redux';
import todos from './todos/widgets';
import users from './users/widgets';

export default combineReducers({
  todos,
  users
});
