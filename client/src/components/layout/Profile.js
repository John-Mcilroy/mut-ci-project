import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Profile = ({ isAuthenticated }) => {

  // Redirect user if not authenticated
  if(!isAuthenticated) {
    return <Redirect exact to='/' />
  }

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  )
}

Profile.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Profile);