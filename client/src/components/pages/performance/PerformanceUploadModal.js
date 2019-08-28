import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideUpload } from '../../../actions/upload';

const Upload = ({ upload, hideUpload }) => {
  const [ file, setFile ] = useState('');
  const [ fileName, setFileName ] = useState('Choose File');
  const [ uploadedFile, setUploadedFile ] = useState({});
  const [ message, setMessage ] = useState('');
  
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
      setMessage('File Uploaded');

    } catch(err) {
      if( err.response.status === 500 ) {
        setMessage('There was a problem with the Server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }

  return upload !== false && (
    <div onClick={() => { hideUpload() }}>
      {message}
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} />
        <br />
        <input type="submit" value="Upload" />
      </form>
    </div>
  )
}

Upload.propTypes = {
  upload: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  upload: state.upload,
})

export default connect(mapStateToProps, { hideUpload })(Upload);