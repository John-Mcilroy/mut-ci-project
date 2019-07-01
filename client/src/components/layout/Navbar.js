import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import logo from '../../assets/placeholder-logo.png';

const Navbar = ({ auth: { isAuthenticated, loading },  logout }) => {

  return (
    <nav>
      <img className="nav__logo" src={logo} alt='' />
      <ul className="nav__list">
        <li className="nav__list-item">Home</li>
        <li className="nav__list-item">Perf. Tracker</li>
        <li className="nav__list-item nav__list-item__active">Active</li>
      </ul>
        <a 
          onClick={logout} 
          href="#!" style={{ textDecoration: 'none' }} 
          className="nav__list-item nav__logout"
        >
            Log Out
        </a>
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = state => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { logout })(Navbar);