import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profile';

import Logo from '../layout/Logo';
import '../stylesheets/Profile.css';

const Profile = ({ logout, getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div className="container">
      <Logo />
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
            <h1>Hello, {profile.profile && profile.profile.user.name}</h1>
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
        <Link to='/performance' className="sidenav-tracker">
          <p className="verticle-center">
            Performance<br />Tracker
          </p>
        </Link>
      </aside>
    </div>
  );
}
console.log(localStorage);
Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
})

export default connect(mapStateToProps, { getCurrentProfile, logout })(Profile);