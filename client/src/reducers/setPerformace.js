import {
  SHOW_UPLOADED_PERFORMANCE,
  SEARCH_PERFORMANCE
} from '../actions/types';

const initialState = {
  viewType: 'day',
  loading: true,
  records: []
};

export default (state = initialState, action) => {
  const { type,  payload } = action;

  switch(type) {
    case SHOW_UPLOADED_PERFORMANCE:
      return {
        ...state,
        loading: false,
        records: payload
      };
    case SEARCH_PERFORMANCE:
      return {
        ...state,
        loading: false,
        records: payload
      }
    default: 
      return state;
  }
}
