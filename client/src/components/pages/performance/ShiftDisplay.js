import React from 'react';
import './styles/ShiftDisplay.css';
import PerformanceRing from './PerformanceRing';
import { connect } from 'react-redux';

function ShiftDisplay({ setPerformance }) {
  if(!setPerformance.shiftRecords) {
    return;
  }
  const chill = setPerformance.shiftRecords.find(record => record.workCategory === 'chilledPicking' || record.workCategory === 'chillPick') || '';
  const frv = setPerformance.shiftRecords.find(record => record.workCategory === 'FRVPicking' || record.workCategory === 'frvPick') || '';
  const ambient = setPerformance.shiftRecords.find(record => record.workCategory === 'ambientPicking' || record.workCategory === 'ambientPick') || '';
  const chillReceiving = setPerformance.shiftRecords.find(record => record.workCategory === 'chilledReceiving' || record.workCategory === 'chillReceiving') || '';
  const ambientReplenishment = setPerformance.shiftRecords.find(record => record.workCategory === 'ambientReplenishment') || '';
  const loading = setPerformance.shiftRecords.find(record => record.workCategory === 'loading') || '';

  return (
    <div className='shift-display'>
      <h2 className='shift-display__title'>Brief Shift Summary</h2>
      <hr style={{ margin: '.3em' }} />
      {setPerformance.shiftRecords.length > 0 ? 
        <ul className='shift-display__record'>
          <li className='shift-display__record-item'><p>Chill Pick</p><PerformanceRing data={chill} /></li>
          <li className='shift-display__record-item'><p>FRV Pick</p><PerformanceRing data={frv} /></li>
          <li className='shift-display__record-item'><p>Ambient Pick</p><PerformanceRing data={ambient} /></li>
          <li className='shift-display__record-item'><p>Chill Scan</p><PerformanceRing data={chillReceiving} /></li>
          <li className='shift-display__record-item'><p>Ambient Replen.</p><PerformanceRing data={ambientReplenishment} /></li>
          <li className='shift-display__record-item'><p>Loading</p><PerformanceRing data={loading} /></li>
        </ul> 
        : <></>}
    </div>
  )
}

const mapStateToProps = state => ({
  setPerformance: state.setPerformance
});

export default connect(mapStateToProps)(ShiftDisplay);
