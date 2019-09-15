import {
  SHOW_UPLOAD_MODAL
} from './types';

export const handleUploadModal = () => dispatch => {
  dispatch({
    type: SHOW_UPLOAD_MODAL
  })
};