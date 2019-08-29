import { SHOW_UPLOAD_MODAL, HIDE_UPLOAD_MODAL } from './types';

export const showUploadModal = () => dispatch => {
  return dispatch({
    type: SHOW_UPLOAD_MODAL
  })
}

export const hideUploadModal = () => dispatch => {
  return dispatch({
    type: HIDE_UPLOAD_MODAL
  })
}