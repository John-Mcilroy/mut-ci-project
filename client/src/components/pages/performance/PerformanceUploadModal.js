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

    uploadPerformance({ file });
  }

  return (
    <ModalBackdrop>
      <div className='performance-upload'>
          <p className="close-modal" onClick={handleUploadModal}/>
        <div className='performance-upload__header'>
          <h1>UPLOAD RECORDS</h1>
        </div>
        <form onSubmit={onSubmit} className='upload-form'>
        <div className='upload-container'>
          <label htmlFor='file-upload' className='performance-upload__input'>Select File</label>
          <input id='file-upload' onChange={onChange} type='file' hidden />
          <p className='uploaded-file'>{fileName}</p>
        </div>
          <input type='submit' className='performance-upload__button' value='Upload' />
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