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

import './styles/Performance.css';

const Performance = ({ handleUploadModal, uploadModal, logout }) => {

  return (
    <div className='performance'>
      <div className='performance-controls'>
      <p className="performance-controls__back-btn" onClick={logout}>{'< '} Logout</p>
        <PerformanceSearch />
        <Logo />
      </div>
      <div className='performance-view'>
        <h1 className='performance-view__title'>Performance Overview</h1>
        <p className='performance-view__upload-button' onClick={handleUploadModal}>Upload Records</p>
        {uploadModal && <Portal>
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
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state =>  ({
  uploadModal: state.uploadModal
});

export default connect(mapStateToProps, { handleUploadModal, logout })(Performance);
