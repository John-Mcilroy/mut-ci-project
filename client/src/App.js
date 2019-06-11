import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Landing from './components/layout/Landing';

const App = () =>   
  <Router>
    <Fragment>
      <Route exact path='/' component={Landing} />
    </Fragment>
  </Router>

export default App;
