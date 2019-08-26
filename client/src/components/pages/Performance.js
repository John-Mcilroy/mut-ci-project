import React from 'react';

import Logo from '../layout/Logo';
import PerformanceDisplay from '../layout/PerformanceDisplay';
import PerformanceSearch from '../layout/PerformanceSearch';

import '../stylesheets/Performance.css';

const Performance = () => {
  return (
    <div className='performance'>
      <div className='performance-controls'>
        <PerformanceSearch />
        <Logo />
      </div>
      <div className='performance-view'>
        <h1 className='performance-view__title'>Performance Overview</h1>
        <p className='performance-view__upload-button'>Upload Records</p>
        <PerformanceDisplay />
      </div>
    </div>
  )
}

export default Performance;