import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles/PerformanceDisplay.css';

import PerformanceRecord from './PerformanceRecord';

const PerformanceDisplay = ({ performanceUpload }) => {
  const [ displayType, setDisplayType ] = useState('chillPick');

  const changeDisplayType = (type) => {
    return setDisplayType(type);
  }

  return (
    <>
      <ul className='performance-display__tags-list'>
        <li 
          className={
            displayType === 'chillPick' ? 'performance-display__tag performance-display__tag-active' : 'performance-display__tag'
          } 
          onClick={ 
            () => changeDisplayType('chillPick') 
          }>Chill Pick</li>

        <li
          className={
            displayType === 'frvPick' ? 'performance-display__tag performance-display__tag-active' : 'performance-display__tag'
          } 
          onClick={
            () => changeDisplayType('frvPick')
          }>FRV Pick</li>

        <li
          className={
            displayType === 'ambientPick' ? 'performance-display__tag performance-display__tag-active' : 'performance-display__tag'
          } 
          onClick={
            () => changeDisplayType('ambientPick')
          }>Ambient Pick</li>

      </ul>
      <div className='performance-display'>
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
          if(displayType === 'chillPick') {
            if(records[0].chillPick) {
              return (
                <PerformanceRecord
                  partnerName={name}
                  partnerNumber={number}
                  performance={[
                    records[0].chillPick.performance,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                  ]}
                  key={index}
                />
              )
            } else {
              return null;
            }
          }
          if(displayType === 'frvPick') {
            if(records[0].frvPick) {
              return (
                <PerformanceRecord
                  partnerName={name}
                  partnerNumber={number}
                  performance={[
                    records[0].frvPick.performance,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                  ]}
                  key={index}
                />
              )
            } else {
              return null;
            }
          }
          if(displayType === 'ambientPick') {
            if(records[0].ambientPick) {
              return (
                <PerformanceRecord
                  partnerName={name}
                  partnerNumber={number}
                  performance={[
                    records[0].ambientPick.performance,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                  ]}
                  key={index}
                />
              )
            } else {
              return null;
            }
          }
        }) : <h3 className='no-data'>No Data</h3>}
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  performanceUpload: state.performanceUpload
});

export default connect(mapStateToProps)(PerformanceDisplay);