import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

// Components
import Landing from './components/pages/Landing';
import Profile from './components/pages/Profile';
import setAuthToken from './utils/setAuthToken';

// Redux Components
import Alert from './components/layout/Alert';


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
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
