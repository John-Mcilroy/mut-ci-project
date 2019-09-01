import React from 'react';
import PerformanceRing from './PerformanceRing';

import './styles/PerformanceRecord.css';

const PerformanceRecord = ({
  partnerName = "Naming Error",
  partnerNumber = "Error",
  performance = [
    'error',
    'error',
    'error',
    'error',
    'error',
    'error',
    'error',
  ]
}) => {
  return (
    <div className="overview-record">
      <div className="partner-record__container">
        <ul>
          <li className="partner-record__name">{partnerName}</li>
          <li className="partner-record__number">{partnerNumber}</li>
        </ul>
      </div>

      <div className="performance-records">
        {console.log(typeof performance)}
        {typeof performance === 'object' ? performance.map(performance => {
          return <PerformanceRing performance={performance} />
        }) : <PerformanceRing />}
      </div>
    </div>
  );
};

export default PerformanceRecord;