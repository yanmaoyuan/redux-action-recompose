import { users, todos } from './mock';

const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const FETCH_DATA_RESPONSE = 'FETCH_DATA_RESPONSE';

const asyncHandlers = {
  [FETCH_DATA_REQUEST](state) {
    return {
      ...state,
      isFetching: true
    };
  },
  [FETCH_DATA_RESPONSE](state, action) {
    return {
      ...state,
      isFetching: false,
      dataExpired: false,
      payload: action.payload
    };
  }
};

const fetchDataRequest = requestOnPage => {
  return {
    type: FETCH_DATA_REQUEST,
    requestOnPage
  };
};

const fetchDataSuccess = payload => ({
  type: FETCH_DATA_RESPONSE,
  payload
});

export const fetchData = url => {
  return dispatch => {
    dispatch(fetchDataRequest(1));
    setTimeout(() => {
      return dispatch(fetchDataSuccess(url === 'users' ? users : todos));
    }, 2000);
  };
};

export default asyncHandlers;
