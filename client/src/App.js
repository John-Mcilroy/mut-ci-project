import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, /*Switch*/ } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';


// Components
import Landing from './components/layout/Landing';

const App = () =>
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Landing} />
        </Fragment>
      </Router>
    </Provider>

export default App;
