import React from 'react';
import PerformanceRing from './PerformanceRing';

import './stylesheets/PerformanceRecord.css';

const PerformanceRecord = ({
  partnerName = "Naming Error",
  partnerNumber = "Error"
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
        <PerformanceRing performance={Math.floor(Math.random() * 100 + 15)}/>
        <PerformanceRing performance={Math.floor(Math.random() * 100 + 15)}/>
        <PerformanceRing performance={Math.floor(Math.random() * 100 + 15)}/>
        <PerformanceRing performance={Math.floor(Math.random() * 100 + 15)}/>
        <PerformanceRing performance={Math.floor(Math.random() * 100 + 15)}/>
        <PerformanceRing performance={Math.floor(Math.random() * 100 + 15)}/>
        <PerformanceRing performance={Math.floor(Math.random() * 100 + 15)}/>
      </div>
    </div>
  );
};

export default PerformanceRecord;