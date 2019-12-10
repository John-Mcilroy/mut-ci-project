import React from 'react';
import { connect } from 'react-redux';
import './styles/PerformanceDisplay.css';
import ShiftDisplay from './ShiftDisplay';

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
    });

    return performance;
  };

  const checkUnitsPerHour = (partnerRecord, workCategory) => {
    let unitsPerHour;
    
    partnerRecord.forEach((record, index) => {
      const recordValues = Object.values(record).includes(workCategory);
      
      if(recordValues) {
        unitsPerHour = record.unitsPerHour;
      } else {
        return;
      }
    })

    return unitsPerHour;
  }

  return (
    <>
      <div className='performance-display'>
          
    <ShiftDisplay />
          
          <ul className='performance-display__inner-tags'>
            <li></li>
            <li className='performance-display__inner-tag'>Chill<br/>Pick</li>
            <li className='performance-display__inner-tag'>FRV<br/>Pick</li>
            <li className='performance-display__inner-tag'>Ambient<br/>Pick</li>
            <li className='performance-display__inner-tag'>Ambient<br/>Replen.</li>
            <li className='performance-display__inner-tag'>Chill<br/>Receiving</li>
            <li className='performance-display__inner-tag'><br/>Loading</li>
            <li className='performance-display__inner-tag'><br/>Overall</li>
          </ul>
        <div className='performance-display__inner'>
          {setPerformance.records.length > 0 ? setPerformance.records.map((record, index) => {
            const { name, number, records } = record;

            return (
                  <PerformanceRecord
                    partnerName={name}
                    partnerNumber={number}
                    performance={[
                      {
                        performance: checkWorkCategory(records, 'chillPick'),
                        unitsPerHour: checkUnitsPerHour(records, 'chillPick'),
                      },
                      {
                        performance: checkWorkCategory(records, 'frvPick'),
                        unitsPerHour: checkUnitsPerHour(records, 'frvPick'),
                      },
                      {
                        performance: checkWorkCategory(records, 'ambientPick'),
                        unitsPerHour: checkUnitsPerHour(records, 'ambientPick'),
                      },
                      {
                        performance: checkWorkCategory(records, 'ambientReplenishment'),
                        unitsPerHour: checkUnitsPerHour(records, 'ambientReplenishment'),
                      },
                      {
                        performance: checkWorkCategory(records, 'chillReceiving'),
                        unitsPerHour: checkUnitsPerHour(records, 'chillReceiving'),
                      },
                      {
                        performance: checkWorkCategory(records, 'loading'),
                        unitsPerHour: checkUnitsPerHour(records, 'loading'),
                      },
                      undefined,
                    ]}
                    key={number}
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
