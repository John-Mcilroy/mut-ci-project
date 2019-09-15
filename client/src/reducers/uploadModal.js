import {
  SHOW_UPLOAD_MODAL 
} from '../actions/types';

const initialState = false;

export default (state = initialState, action) => {
  const { type } = action;

  switch(type) {
    case SHOW_UPLOAD_MODAL:
      return !state;
    default: 
      return state;
  }
}