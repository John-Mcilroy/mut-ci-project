import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

// Components
import Landing from './components/pages/landing/Landing';
import Performance from './components/pages/performance/Performance';
import ProgressTracker from './components/pages/progressTracker/ProgressTracker';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux Components
import Alert from './components/layout/Alert';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ match }) =>{
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
      
            <PrivateRoute path='/performance' component={Performance} />
            <PrivateRoute path='/progress-tracker' component={ProgressTracker} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
