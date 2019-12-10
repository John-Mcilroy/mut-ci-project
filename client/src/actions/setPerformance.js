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

export const searchPerformance = ({
  partner = null,
  workCategory = null,
  dateFrom = null,
  dateTo = null
}) => async dispatch => {
  
  let queryPartner = partner ? `partner=${partner}` : null;
  let queryWorkCategory = workCategory ? `work-category=${workCategory}` : null;
  let queryDateFrom = dateFrom ? `date-from=${dateFrom}` : null;
  let queryDateto = dateTo ? `date-to=${dateTo}` : null;
  let queries = [];

  const searchString = (queryArray) => {
    let result = '/api/performance/search?'

    queryArray.forEach((query, index) => {
      if(index >= 1) {
        query = `&&${query}`;
      }

      result = result + query;
    })

    return result;
  }

  if(queryPartner) queries.push(queryPartner);
  if(queryWorkCategory) queries.push(queryWorkCategory);
  if(queryDateFrom) queries.push(queryDateFrom);
  if(queryDateto) queries.push(queryDateto);

  if(queries <= 0) {
    dispatch(setAlert('Please enter search criteria'));
  }
  const res = await axios.get(searchString(queries))

  dispatch({
    type: SEARCH_PERFORMANCE,
    payload: res.data
  });

  dispatch(setAlert( 'Search Success', 'success' ))
}
