import React from 'react';

import Logo from '../layout/Logo';
import '../stylesheets/Performance.css';

const Performance = () => {
  return (
    <div className='performance'>
      <div className='performance-controls'>
        <Logo />
      </div>
      <div className='performance-view'>
        <h1 className='performance-view__title'>Performance Overview</h1>

      </div>
    </div>
  )
}

export default Performance;