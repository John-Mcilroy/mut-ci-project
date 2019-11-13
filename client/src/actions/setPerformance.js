import axios from 'axios';
import {
  SHOW_UPLOADED_PERFORMANCE, SEARCH_PERFORMANCE
} from './types';
import { handleUploadModal } from './uploadModal';
import { setAlert } from './alert';
import { set } from 'mongoose';

export const uploadPerformance = ({ file }) => async dispatch => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if(res.data === 'duplicate') {
      dispatch(setAlert('No duplicate records allowed', 'fail'));
      return;
    }
    
    dispatch(setAlert( 'Upload Successful', 'success' ));
    dispatch({
      type: SHOW_UPLOADED_PERFORMANCE,
      payload: res.data
    });

    dispatch(handleUploadModal());

  } catch(err) {
    dispatch(setAlert( 'Upload Failed', 'fail'));
  }
}

export const searchPerformance = ({date = null}) => async dispatch => {
  if(!date) {
    dispatch(setAlert('Please enter a date', 'fail'));
    return;
  }

  let res;

  if(date) {
    try {
      res = await axios.get(`api/performance/search?date=${date}`);
    } catch(err) {
      dispatch(setAlert('No Records Found', 'fail'));
      return;
    }

    if(!res.data.records[0]) {
      dispatch(setAlert('No records found', 'fail'));
      return;
    }
  }

  dispatch({
    type: SEARCH_PERFORMANCE,
    payload: res.data
  });

  dispatch(setAlert( 'Search Success', 'success' ))
}
