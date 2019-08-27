import React from 'react';

import Logo from '../../layout/Logo';
import PerformanceDisplay from './PerformanceDisplay';
import PerformanceSearch from './PerformanceSearch';

import './styles/Performance.css';

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