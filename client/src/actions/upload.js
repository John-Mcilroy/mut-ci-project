import { SHOW_UPLOAD, HIDE_UPLOAD } from './types';

export const setUpload = () => dispatch => {
  return dispatch({
    type: SHOW_UPLOAD
  })
}

export const hideUpload = () => dispatch => {
  return dispatch({
    type: HIDE_UPLOAD
  })
}