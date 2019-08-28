import React from 'react';

import Logo from '../../layout/Logo';
import PerformanceDisplay from './PerformanceDisplay';
import PerformanceSearch from './PerformanceSearch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles/Performance.css';
import { setUpload } from '../../../actions/upload';

const Performance = ({ setUpload }) => {
  return (
    <div className='performance'>
      <div className='performance-controls'>
        <PerformanceSearch />
        <Logo />
      </div>
      <div className='performance-view'>
        <h1 className='performance-view__title'>Performance Overview</h1>
        <p className='performance-view__upload-button' onClick={() => { setUpload('true') }}>Upload Records</p>
        <PerformanceDisplay />
      </div>
    </div>
  )
}

const propTypes = {
  upload: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  upload: state.upload
})

export default connect(mapStateToProps, { setUpload })(Performance);