import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import App from './components/app'
import SearchPage from './components/SearchPage';
import reducer from './reducers/';


ReactDOM.render(
  <Provider store={createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
    <SearchPage
      history={ history }
      location={ location }
    />
  </Provider>,
  document.querySelector('.container')
)
