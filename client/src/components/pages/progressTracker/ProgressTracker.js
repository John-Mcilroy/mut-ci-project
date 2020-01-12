import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const ProgressTracker = ({ isAuthenticated }) => {
  const [ input, setInput ] = useState();
  const [ data, setData ] = useState([ ]);


  useEffect(() => {
    const storage = window.localStorage;
    const storageLength = Object.keys(storage);
    if(storageLength !== 0) {
      storageLength.sort((first, second) => first - second);
      setData(storageLength.map(existingData => {
        return storage.getItem(existingData);
      }))
    }

  }, [])

  if(!isAuthenticated) {
    return <Redirect exact to='/' />
  }


  

  let chartReference = {};

  const chartData = {
    labels: [
      '14:00', '15:00', '16:00',
      '17:00', '18:00', '19:00',
      '20:00', '21:00', '22:00'
    ],
    
    datasets: [
      {
        label: 'Chill: Left to Pick',
        pointBackgroundColor: 'grey',
        borderWidth: 1,
        borderColor: 'black',
        data: data,
        spanGaps: false
      },
      {
        spanGaps: true,
        label: 'Chill: Direct',
        data: [ data[0] ? data[0] : NaN, NaN, NaN, NaN, NaN, NaN, NaN, 0, NaN ]
      }
    ],
    options: {
      title: {
        display: true,
        text: 'Chill Picking Progress'
      },
      scales: {
        xAxes: [{
          ticks: {
              autoSkip: true,
              maxTicksLimit: 18
          }
        }]
      }
    }
  }

  const storage = window.localStorage;
  
  const onSubmit = (event) => {
    event.preventDefault();
    setData([...data, input]);
    
    if(!storage.getItem('1400')) {
      storage.setItem('1400', input)
      console.log('Data Set - 14:00')

    } else if(!storage.getItem('1500')) {
      storage.setItem('1500', input)
      console.log('Data Set - 15:00')

    } else if(!storage.getItem('1600')) {
      storage.setItem('1600', input)
      console.log('Data Set - 16:00')

    } else if(!storage.getItem('1700')) {
      storage.setItem('1700', input)
      console.log('Data Set - 17:00')

    } else if(!storage.getItem('1800')) {
      storage.setItem('1800', input)
      console.log('Data Set - 18:00')

    } else if(!storage.getItem('1900')) {
      storage.setItem('1900', input)
      console.log('Data Set - 19:00')

    } else if(!storage.getItem('2000')) {
      storage.setItem('2000', input)
      console.log('Data Set - 20:00')

    } else if(!storage.getItem('2100')) {
      storage.setItem('2100', input)
      console.log('Data Set - 21:00')

    } else if(!storage.getItem('2200')) {
      storage.setItem('2200', input)
      console.log('Data Set - 22:00')

    } else {
      console.log('Error?');
    }

    let lineChart = chartReference.chartInstance;
    lineChart.update();

    setInput('');
  }

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  const clearStorage = () => {
    window.localStorage.clear();
    setData('');
    return;
  }
  
  return (
    <div>
      <Link to='/performance' className="sidenav-tracker">
        <p className="performance-controls__back-btn" style={{display: 'absolute', left: '0', width: '12em', marginLeft: '3em'}}>Back to Performance</p>
      </Link>
      
      <h1 
        style={{
          textAlign: 'center', 
          marginTop: '2em'
        }}
      >Progress Tracker</h1>
      
      <div 
        style={{
          width: '80%', 
          margin: '4em auto'
        }}
      >
        <Line 
          ref={(reference) => chartReference = reference} 
          data={chartData} 
          options={chartData.options}  
          width={100} 
          height={30} 
          onChange={onSubmit}
        />

          <p 
            style={{
              display: 'flex',
              fontSize: '.7em',
              justifyContent: 'center',
              marginTop: '5em'
            }}
          >
            Entered Data is added one hour at a time
          </p>

        <form
          onSubmit={onSubmit} 
          style={{ 
            marginTop: '.5em', 
            display: 'flex', 
            justifyContent: 'center'
          }}
        >

          <label htmlFor='chill-value'>
            Data Input 
            <input style={{marginLeft: '1em'}} id='chill-value' placeholder='Enter Value' value={input} onChange={onInputChange} autoComplete='off' />
            <button type='submit'>Submit</button>
          </label>
        </form>
        <div style={{width: '40%', margin: 'auto', textAlign: 'center', marginTop: '3em'}}>
          <button onClick={clearStorage} style={{textAlign: 'center', margin: '.5em', color: 'red', border: 'dashed 1px red', padding: '.5em', outline: 'none'}}>Clear Data</button>
          <p style={{fontSize: '.7em', color: 'red'}}>Warning: This is irreversable</p>
        </div>
      </div>
    </div>
  )
}

Performance.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state =>  ({
  uploadModal: state.uploadModal,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProgressTracker);