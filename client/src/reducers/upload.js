import { SHOW_UPLOAD, HIDE_UPLOAD } from '../actions/types';

const initialState = false;

export default function(state = initialState, action) {
  const { type } = action;

  switch(type) {
    case SHOW_UPLOAD:
      return state = true;
    case HIDE_UPLOAD:
      return state = false;
    default:
      return state;
  }
}