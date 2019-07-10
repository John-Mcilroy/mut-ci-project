import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import '../stylesheets/Profile.css';

const Profile = ({ isAuthenticated, logout }) => {

  // Redirect user if not authenticated
  if(!isAuthenticated) {
    return <Redirect exact to='/' />
  }

  return (
    <div className="container">
      <header className="auth-head__heading">
        MUT <br />
        <span className="auth-head__title">Management Utility Tool</span>
      </header>
      <main>
        <ul className="nav">
          <li>
            <a href="#!" hidden>Nav</a>
          </li>
          <li>
            <a href="#!" hidden>Items</a>
          </li>
          <li>
            <a href="#!" hidden>Here</a>
          </li>
          <li>
            <a href="#!" onClick={logout}>Logout</a>
          </li>
        </ul>
        <div className="main-view">
          <div className="main-view__greeting">
            <h1>Hello, John McIlroy</h1>
            <h6 className="main-view__sub-greeting">
              How can I help you today?
            </h6>
          </div>
        </div>

        <ul className="footer-list">
          <li className="footer-list__register">
            <h6>Report a Bug</h6>
          </li>
          <li className="footer-list__copy">
            <h6>{/*copyright*/}&copy; 2019</h6>
          </li>
        </ul>
      </main>

      <aside>
        <div className="sidenav-planner">
          <p className="verticle-center">
            Planning<br /> Tool
          </p>
        </div>
        <div className="sidenav-tracker">
          <p className="verticle-center">
            Performance<br />Tracker
          </p>
        </div>
      </aside>
    </div>
  );
}

Profile.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { logout })(Profile);