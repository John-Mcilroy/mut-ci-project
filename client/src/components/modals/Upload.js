import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [ file, setFile ] = useState('');
  const [ fileName, setFileName ] = useState('Choose File');
  const [ uploadedFile, setUploadedFile ] = useState({});
  const [ message, setMessage ] = useState('');
  const [ recentRecords, setRecentRecords ] = useState([]);
  
  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setRecentRecords(res.data);
      setMessage('File Uploaded');

    } catch(err) {
      if( err.response.status === 500 ) {
        setMessage('There was a problem with the Server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }

  const backgroundChange = (rate) => {
    if(rate > 80) {
      return 'rgb(50, 200, 50)';
    } else {
      return 'rgb(200, 50, 50)';
    }
  }

  return (
    <div>
      {message}
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} />
        <br />
        <input type="submit" value="Upload" />
      </form>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)'
      }}>
        {recentRecords.length !== 0 ? recentRecords.map(record => <div style={{
          minWidth: '350px',
          margin: '15px auto',
          textAlign: 'center',
          padding: '15px 0 10px 0',
          background: backgroundChange(record.pickrate)
        }}>
            <h3>Partner Number: <span>{record.number}</span></h3>
            <br />
            <h5>Performance (%): </h5><span>{record.pickrate}</span>
            <br />
            <h5>Time Taken (goal): </h5><span>{record.goalTime}</span>
            <br />
            <h5>Time Taken (actual): </h5><span>{record.actualTime}</span>
            <br />
            <h5>Total Picks: </h5><span>{record.totalPicks}</span>
            <br />
            <h5>Total Units (cases): </h5><span>{record.totalCases}</span>
            <br />
            <h5>Units per Hour (cases): </h5><span>{record.unitsPerHour}</span>
            <br />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Upload;