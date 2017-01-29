import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Demo from './app';
import rootReducer from './root-reducers';

const Index = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(thunk))
  );

  return (
    <Provider store={store}>
      <div style={{margin: '0 5em'}}>
        <Demo />
      </div>
    </Provider>
  );
};

render(
  <Index />,
  document.getElementById('content')
);
