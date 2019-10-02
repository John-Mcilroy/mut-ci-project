import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles/PerformanceDisplay.css';

import PerformanceRecord from './PerformanceRecord';

const PerformanceDisplay = ({ performanceUpload }) => {
  const [ displayType, setDisplayType ] = useState('Chill Pick');

  const changeDisplayType = (type) => {
    return setDisplayType(type);
  }

  return (
    <>
      <ul className='performance-display__tags-list'>
        <li 
          className={
            displayType === 'Chill Pick' ? 'performance-display__tag performance-display__tag-active' : 'performance-display__tag'
          } 
          onClick={ 
            () => changeDisplayType('Chill Pick') 
          }>Chill Pick</li>

        <li
          className={
            displayType === 'FRV Pick' ? 'performance-display__tag performance-display__tag-active' : 'performance-display__tag'
          } 
          onClick={
            () => changeDisplayType('FRV Pick')
          }>FRV Pick</li>

        <li
          className={
            displayType === 'Ambient Pick' ? 'performance-display__tag performance-display__tag-active' : 'performance-display__tag'
          } 
          onClick={
            () => changeDisplayType('Ambient Pick')
          }>Ambient Pick</li>

      </ul>
      <div className='performance-display'>
          <h3 style={{padding: '1em 0 0 5%'}}>{'Displaying: ' + displayType}</h3>
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
          {performanceUpload.records.length > 0 ? performanceUpload.records.map((record, index) => {
            const { name, number, records } = record;
            if(displayType === 'Chill Pick') {
              // if(records[0].chillPick) {
                return (
                  <PerformanceRecord
                    partnerName={name}
                    partnerNumber={number}
                    performance={[
                      (Object.keys(records[0]).includes('chillPick') ? records[0].chillPick.performance : undefined),
                      (Object.keys(records[0]).includes('frvPick') ? records[0].frvPick.performance : undefined),
                      (Object.keys(records[0]).includes('ambientPick') ? records[0].ambientPick.performance : undefined),
                      (Object.keys(records[0]).includes('ambientPutaway') ? records[0].ambientPutaway.performance : undefined),
                      (Object.keys(records[0]).includes('chillReceiving') ? (Math.round(records[0].chillReceiving.unitsPH / 450 * 100)) : undefined),
                      (Object.keys(records[0]).includes('loading') ? records[0].loading.performance : undefined),
                      (undefined),
                    ]}
                    key={index}
                  />
                )
              } else {
                return null;
              }
            // }
            // if(displayType === 'FRV Pick') {
            //   if(records[0].frvPick) {
            //     return (
            //       <PerformanceRecord
            //         partnerName={name}
            //         partnerNumber={number}
            //         performance={[
            //           records[0].frvPick.performance,
            //           undefined,
            //           undefined,
            //           undefined,
            //           undefined,
            //           undefined,
            //           undefined,
            //         ]}
            //         key={index}
            //       />
            //     )
            //   } else {
            //     return null;
            //   }
            // }
            // if(displayType === 'Ambient Pick') {
            //   if(records[0].ambientPick) {
            //     return (
            //       <PerformanceRecord
            //         partnerName={name}
            //         partnerNumber={number}
            //         performance={[
            //           records[0].ambientPick.performance,
            //           undefined,
            //           undefined,
            //           undefined,
            //           undefined,
            //           undefined,
            //           undefined,
            //         ]}
            //         key={index}
            //       />
            //     )
            //   } else {
            //     return null;
            //   }
            // }
          }) : <h3 className='no-data'>No Data</h3>}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  performanceUpload: state.performanceUpload
});

export default connect(mapStateToProps)(PerformanceDisplay);