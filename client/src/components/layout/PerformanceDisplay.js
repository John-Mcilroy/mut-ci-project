import React from 'react';
import './stylesheets/PerformanceDisplay.css';

import PerformanceRecord from './PerformanceRecord';

const PerformanceDisplay = () => {
  return (
      <div className='performance-display'>
        <ul className='performance-display__tags-list'>
          <li className='performance-display__tag performance-display__tag-active'>Daily</li>
          <li className='performance-display__tag'>Weekly</li>
          <li className='performance-display__tag'>Monthly</li>
        </ul>
        {/* <ul>
          <li>Chill Pick</li>
          <li>Chill Receiving</li>
          <li>FRV Pick</li>
          <li>Ambient Pick</li>
          <li>Ambient Putaway</li>
          <li>Loading</li>
          <li>Overall</li>
        </ul> */}
        <PerformanceRecord partnerName='John Mcilroy' partnerNumber='83251693' />
        <PerformanceRecord partnerName='John Mcilroy' partnerNumber='83251693' />
        <PerformanceRecord partnerName='John Mcilroy' partnerNumber='83251693' />
        <PerformanceRecord partnerName='John Mcilroy' partnerNumber='83251693' />
        <PerformanceRecord partnerName='John Mcilroy' partnerNumber='83251693' />
        <PerformanceRecord partnerName='John Mcilroy' partnerNumber='83251693' />
        <PerformanceRecord partnerName='John Mcilroy' partnerNumber='83251693' />
      </div>
  )
}

export default PerformanceDisplay;