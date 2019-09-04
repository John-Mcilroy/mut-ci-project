import React from 'react';

import Logo from '../../layout/Logo';
import PerformanceDisplay from './PerformanceDisplay';
import PerformanceSearch from './PerformanceSearch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles/Performance.css';
import { showUploadModal } from '../../../actions/uploadModal';

const Performance = ({ uploadModal }) => {
  return (
    <div className='performance'>
      <div className='performance-controls'>
        <PerformanceSearch />
        <Logo />
      </div>
      <div className='performance-view'>
        <h1 className='performance-view__title'>Performance Overview</h1>
        <Link className='performance-view__upload-button' to='/upload'>Upload Records</Link>
        <PerformanceDisplay />
      </div>
    </div>
  )
}

Performance.propTypes = {
  uploadModal: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  uploadModal: state.upload
})

export default connect(mapStateToProps, { showUploadModal })(Performance);