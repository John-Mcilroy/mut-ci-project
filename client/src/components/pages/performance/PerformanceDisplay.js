import React from 'react';
import { connect } from 'react-redux';
import './styles/PerformanceDisplay.css';

import PerformanceRecord from './PerformanceRecord';

const PerformanceDisplay = ({ setPerformance }) => {

  const checkWorkCategory = (partnerRecord, workCategory) => {
    let performance;
    
    partnerRecord.forEach((record, index) => {
      const recordValues = Object.values(record).includes(workCategory);
      
      if(recordValues) {
        performance = record.performance;
      } else {
        return;
      }
    })

    return performance;
  }

  return (
    <>
      <div className='performance-display'>
          <h3 style={{padding: '1em 0 0 5%'}}>Viewing Records for: </h3>
        <div className='performance-display__inner'>
          <ul className='performance-display__inner-tags'>
            <li></li>
            <li className='performance-display__inner-tag'>Chill<br/>Pick</li>
            <li className='performance-display__inner-tag'>FRV<br/>Pick</li>
            <li className='performance-display__inner-tag'>Ambient<br/>Pick</li>
            <li className='performance-display__inner-tag'>Ambient<br/>Putaway</li>
            <li className='performance-display__inner-tag'>Chill<br/>Receiving</li>
            <li className='performance-display__inner-tag'><br/>Loading</li>
            <li className='performance-display__inner-tag'><br/>Overall</li>
          </ul>
          {setPerformance.records.length > 0 ? setPerformance.records.map((record, index) => {
            const { name, number, records } = record;

            return (
                  <PerformanceRecord
                    partnerName={name}
                    partnerNumber={number}
                    performance={[
                      (checkWorkCategory(records, 'chillPick')),
                      (checkWorkCategory(records, 'frvPick')),
                      (checkWorkCategory(records, 'ambientPick')),
                      (checkWorkCategory(records, 'ambientPutaway')),
                      (checkWorkCategory(records, 'chillReceiving')),
                      (checkWorkCategory(records, 'loading')),
                      (undefined),
                    ]}
                    key={index}
                  />
                )
            
          }) : <h3 className='no-data'>No Data</h3>}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  setPerformance: state.setPerformance
});

export default connect(mapStateToProps)(PerformanceDisplay);
