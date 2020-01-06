import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import './styles/SinglePerformanceView.css';
import Progress from './Progress';

function SinglePerformanceView(props) {

  console.log(props);
  const name = props.partner.name;
  const number = props.partner.number;
  const records = props.partner.records;
  
  const chillPick = records.find(record => record.workCategory === 'chillPick') || 0;
  const frvPick = records.find(record => record.workCategory === 'frvPick') || 0;
  const ambientPick = records.find(record => record.workCategory === 'ambientPick') || 0;
  const chillReceiving = records.find(record => record.workCategory === 'chillReceiving') || 0;
  const ambientReplenishment = records.find(record => record.workCategory === 'ambientReplenishment') || 0;
  const loading = records.find(record => record.workCategory === 'loading') || 0;
  
  let data = {
    datasets: [{
      data: [ 
        chillPick ? chillPick.direct : null, 
        frvPick ? frvPick.direct : null, 
        ambientPick ? ambientPick.direct : null, 
        chillReceiving ? chillReceiving.direct : null, 
        ambientReplenishment ? ambientReplenishment.direct : null, 
        loading ? loading.direct : null 
      ],
      backgroundColor: [
        'pink', 'blue', 'green',
        'purple', 'red', 'yellow'
      ],
      options: {
        labels: {
          legend: {
            display: false
          }
        }
      }
    }],
    labels: [
    ],
  };

  if(chillPick !== null) data.labels.push('Chill Pick');
  if(frvPick !== null) data.labels.push('FRVPick');
  if(ambientPick !== null) data.labels.push('Ambient Pick');
  if(chillReceiving !== null) data.labels.push('Chill Scan');
  if(ambientReplenishment !== null) data.labels.push('Ambient Replen.');
  if(loading !== null) data.labels.push('Loading');

  return (
    <div className="spv-box">
      <div className="spv-partner">
        <p>{name}</p>
        <p>{number}</p>
      </div>
      <div className="spv-dates">
        <p><span>Date from:</span> {props.startDate}</p>
        <p><span>Date to:</span>   {props.endDate}</p>
      </div>

      <div className="spv-performances">
        <Progress workCategory="Chill Pick" performance={chillPick.performance} />  
        <Progress workCategory="FRV Pick" performance={frvPick.performance} />  
        <Progress workCategory="Ambient Pick" performance={ambientPick.performance} />  
        <Progress workCategory="Chill Scan" performance={chillReceiving.performance} />  
        <Progress workCategory="Ambient Replen." performance={ambientReplenishment.performance} />  
        <Progress workCategory="Loading" performance={loading.performance} />  
      </div>

      <div className="spv-chart" >
        <h3 className="function-time">Time spent on Function (Hours)</h3>
        <Doughnut data={data} options={{ legend: false }} />
      </div>
    </div>
  )
}

export default SinglePerformanceView;