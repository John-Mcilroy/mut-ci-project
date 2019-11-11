import React from 'react';
import './styles/ShiftDisplay.css';
import PerformanceRing from './PerformanceRing';

function ShiftDisplay() {
  return (
    <div className='shift-display'>
      <h2 className='shift-display__title'>Brief Shift Summary</h2>
      <hr style={{ margin: '.3em' }} />
      <ul className='shift-display__record'>
        <li className='shift-display__record-item'><p>Chill Pick</p><PerformanceRing /></li>
        <li className='shift-display__record-item'><p>FRV Pick</p><PerformanceRing /></li>
        <li className='shift-display__record-item'><p>Ambient Pick</p><PerformanceRing /></li>
      </ul>
    </div>
  )
}

export default ShiftDisplay;