import axios from 'axios';
import { setAlert } from './alert';
import {
  PERFORMANCE_UPLOAD_SUCCESS,
  PERFORMANCE_UPLOAD_FAIL
} from './types';
import { handleUploadModal } from './uploadModal';

export const uploadPerformanceRecords = ({ file }) => async dispatch => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    dispatch(setAlert( 'Upload Successful', 'success' ));
    dispatch({
      type: PERFORMANCE_UPLOAD_SUCCESS,
      payload: res.data
    });

    dispatch(handleUploadModal());

  } catch(err) {
    console.log(err.msg);
    dispatch(setAlert( err.msg, 'fail' ));

    dispatch({
      type: PERFORMANCE_UPLOAD_FAIL
    });
  }
}