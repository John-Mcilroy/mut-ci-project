import { SHOW_UPLOAD_MODAL, HIDE_UPLOAD_MODAL } from '../actions/types';

const initialState = false;

export default function(state = initialState, action) {
  const { type } = action;

  switch(type) {
    case SHOW_UPLOAD_MODAL:
      return state = true;
    case HIDE_UPLOAD_MODAL:
      return state = false;
    default:
      return state;
  }
}