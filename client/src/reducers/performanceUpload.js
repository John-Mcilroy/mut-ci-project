import { 
  PERFORMANCE_UPLOAD_SUCCESS, 
  PERFORMANCE_UPLOAD_FAIL 
} from '../actions/types';

const initialState = {
  records: [],
  loading: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case PERFORMANCE_UPLOAD_SUCCESS:
      return {
        ...state,
        records: payload
      }
    case PERFORMANCE_UPLOAD_FAIL:
      return state;
    default:
      return state;
  }

}
