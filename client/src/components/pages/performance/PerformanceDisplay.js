import React, { useState } from 'react';
import './styles/PerformanceDisplay.css';

import PerformanceRecord from './PerformanceRecord';

const PerformanceDisplay = () => {
  const [ displayType, setDisplayType ] = useState('daily');

  const changeDisplayType = (type) => {
    return setDisplayType(type);
  }

  return (
      <div className='performance-display'>
        <ul className='performance-display__tags-list'>
          <li 
            className={
              displayType === 'daily' ? 'performance-display__tag performance-display__tag-active' : 'performance-display__tag'
            } 
            onClick={ 
              () => changeDisplayType('daily') 
            }>Daily</li>

          <li
            className={
              displayType === 'weekly' ? 'performance-display__tag performance-display__tag-active' : 'performance-display__tag'
            } 
            onClick={
              () => changeDisplayType('weekly')
            }>Weekly</li>

          <li
            className={
              displayType === 'monthly' ? 'performance-display__tag performance-display__tag-active' : 'performance-display__tag'
            } 
            onClick={
              () => changeDisplayType('monthly')
            }>Monthly</li>

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
        <PerformanceRecord 
          partnerName='John Mcilroy' 
          partnerNumber='83251693' 
          performance={[
            Math.floor(Math.random() * 100 + 15),
            'error',
            'error',
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15)
          ]} 
        />
        <PerformanceRecord 
          partnerName='John Mcilroy' 
          partnerNumber='83251693' 
          performance={[
            Math.floor(Math.random() * 100 + 15),
            'error',
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            'error',
            Math.floor(Math.random() * 100 + 15)
          ]} 
        />
        <PerformanceRecord 
          partnerName='John Mcilroy' 
          partnerNumber='83251693' 
          performance={[
            'error',
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            'error'
          ]} 
        />
        <PerformanceRecord 
          partnerName='John Mcilroy' 
          partnerNumber='83251693' 
          performance={[
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            'error',
            'error',
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15)
          ]} 
        />
        <PerformanceRecord 
          partnerName='John Mcilroy' 
          partnerNumber='83251693' 
          performance={[
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            'error',
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15)
          ]} 
        />
        <PerformanceRecord partnerName='John Mcilroy' partnerNumber='83251693' />
        <PerformanceRecord 
          partnerName='John Mcilroy' 
          partnerNumber='83251693' 
          performance={[
            'error',
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15),
            'error',
            Math.floor(Math.random() * 100 + 15),
            Math.floor(Math.random() * 100 + 15)
          ]} 
        />
      </div>
  )
}

export default PerformanceDisplay;