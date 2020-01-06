import axios from 'axios';
import {
  SHOW_UPLOADED_PERFORMANCE, SEARCH_PERFORMANCE
} from './types';
import { handleUploadModal } from './uploadModal';
import { setAlert } from './alert';

export const uploadPerformance = ({ file }) => async dispatch => {
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
  dateFrom = null,
  dateTo = null
}) => async dispatch => {
  
  let queryPartner = partner ? `partner=${partner}` : null;
  let queryDateFrom = dateFrom ? `date-from=${dateFrom}` : null;
  let queryDateTo = dateTo ? `date-to=${dateTo}` : null;
  let queries = [];

  if(queryPartner) queries.push(queryPartner);
  if(queryDateFrom) queries.push(queryDateFrom);
  if(queryDateTo) queries.push(queryDateTo);

  if(queries.length <= 0) {
    dispatch(setAlert( 'Please enter search criteria', 'fail' ));
    return;
  }

  if(queryPartner && (dateFrom === dateTo)) {
    dispatch(setAlert( 'Unable to display one user for a set day', 'fail' ));
    return;
  }

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

  const res = await axios.get(searchString(queries))

  if(res.data[0].length <= 0 && res.data[1].length <= 0) {
    dispatch(setAlert( 'No Records Found', 'fail' ));
  } else {
    dispatch({
      type: SEARCH_PERFORMANCE,
      payload: res.data
    });
    
    dispatch(setAlert( 'Search Success', 'success' ))
  }
}
