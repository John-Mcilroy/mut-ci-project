import React from 'react';
import { connect } from 'react-redux';
import Logo from '../../layout/Logo';
import PerformanceDisplay from './PerformanceDisplay';
import PerformanceSearch from './PerformanceSearch';
import PerformanceUploadModal from './PerformanceUploadModal';
import Portal from '../../layout/Portal';
import PropTypes from 'prop-types';
import { handleUploadModal } from '../../../actions/uploadModal';
import { logout } from '../../../actions/auth';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './styles/Performance.css';

import trackerImg from '../progressTracker/assets/graph.svg';

const Performance = ({ handleUploadModal, uploadModal, logout, isAuthenticated }) => {

  if(!isAuthenticated) {
    return <Redirect exact to='/' />
  }

  return (
    <div className='performance'>
      <div className='performance-controls'>
      <p className="performance-controls__back-btn" onClick={logout}>{'< '} Logout</p>
      
      {/* Temporary Graph Link  */}
      <Link 
        to='/progress-tracker' 
        className="sidenav-tracker" 
        style={{
          position: 'relative', 
          left: '1.2em', 
          top: '4.5em', 
          stroke: 'blue', 
          backgroundColor: '#235aff', 
          display: 'flex', 
          width: '3em',
          justifyContent: 'center',
          borderRadius: '40px'
        }}
      >
        <img src={trackerImg} alt='Tracker'></img>
      </Link>
      {/* End Temporary Graph Link */}

        <Logo />
        <PerformanceSearch />
      </div>
      <div className='performance-view'>
        <h1 className='performance-view__title'>Performance Overview</h1>
        <p className='performance-view__upload-button' onClick={handleUploadModal}>Upload Records</p>
        {uploadModal && 
          <Portal>
            <PerformanceUploadModal />
          </Portal>}
        <PerformanceDisplay />
      </div>
    </div>
  )
}

Performance.propTypes = {
  handleUploadModal: PropTypes.func.isRequired,
  uploadModal: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state =>  ({
  uploadModal: state.uploadModal,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { handleUploadModal, logout })(Performance);
