import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles/PerformanceDisplay.css';

import PerformanceRecord from './PerformanceRecord';

const PerformanceDisplay = ({ performanceUpload }) => {
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
      {performanceUpload.records.length > 0 ? performanceUpload.records.map((record, index) => {
        const { name, number, records } = record;

        if(records[0].chillPick) {
          return (
            <PerformanceRecord
              partnerName={name}
              partnerNumber={number}
              performance={[records[0].chillPick.performance]}
              key={index}
            />
          )
        } else {
          return null;
        }
      }) : <h3 className='no-data'>No Data</h3>}
    </div>
  )
}

const mapStateToProps = state => ({
  performanceUpload: state.performanceUpload
});

export default connect(mapStateToProps)(PerformanceDisplay);