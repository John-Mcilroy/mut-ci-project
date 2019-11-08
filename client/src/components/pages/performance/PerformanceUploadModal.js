import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPortal } from 'react-dom';
import axios from 'axios';
import ModalBackdrop from '../../layout/ModalBackdrop';
import './styles/PerformanceUploadModal.css';
import PropTypes from 'prop-types';
import { handleUploadModal } from '../../../actions/uploadModal';
import { uploadPerformance } from '../../../actions/setPerformance';

const UploadModal = ({ handleUploadModal, uploadModal, uploadPerformance }) => {
  const [ file, setFile ] = useState('');
  const [ fileName, setFileName ] = useState('Choose File');
  const [ uploadedFile, setUploadedFile ] = useState({});
  const [ message, setMessage ] = useState('');
  const [ partnerStats, setPartnerStats ] = useState([]);
  
  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const onSubmit = async e => {
    e.preventDefault();

    uploadPerformance({ file }, 'Hello World');

    // const formData = new FormData();
    // formData.append('file', file);

    // try {
    //   const res = await axios.post('/api/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   })
    
    //   const { fileName, filePath } = res.data;
    
    //   setUploadedFile({ fileName, filePath });
    //   setMessage('File Uploaded');
    
    //   setPartnerStats(res.data);
    
    //   console.log(partnerStats);
    
    // } catch(err) {
    //   if( err.response.status === 500 ) {
    //     setMessage('Upload Failed');
    //   } else {
    //     setMessage(err.response.data.msg);
    //   }
    // }
  }

  return (
    <ModalBackdrop>
      <div 
        className='performance-upload'
      >
        {message}
        <form 
          className='performance-upload__form' 
          onSubmit={onSubmit}
        >
          <p className="close-modal" onClick={handleUploadModal}/>
          <label htmlFor='upload-btn'>Upload</label>
          <input 
            type="file" 
            id='upload-btn' 
            onChange={onChange} 
            style={{display: 'none'}} 
          />

          <br />
          <input 
            type='submit' 
            value='upload'
          />
        </form>
      </div>
    </ModalBackdrop>
  )
}

UploadModal.propTypes = {
  uploadPerformance: PropTypes.func.isRequired,
  handleUploadModal: PropTypes.func.isRequired,
  uploadModal: PropTypes.bool.isRequired
}

const mapStateToProps = state =>  ({
  uploadModal: state.uploadModal
});

export default connect(mapStateToProps, { handleUploadModal, uploadPerformance })(UploadModal);