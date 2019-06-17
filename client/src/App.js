import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, /*Switch*/ } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

// Components
import Landing from './components/layout/Landing';
import setAuthToken from './utils/setAuthToken';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () =>{
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Landing} />
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
