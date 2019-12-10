import {
  SHOW_UPLOADED_PERFORMANCE,
  SEARCH_PERFORMANCE
} from '../actions/types';

const initialState = {
  viewType: 'day',
  loading: true,
  records: [],
  shiftRecords: []
};

export default (state = initialState, action) => {
  const { type,  payload } = action;
  
  switch(type) {
    case SHOW_UPLOADED_PERFORMANCE:
      return {
        ...state,
        loading: false,
        records: payload.records,
        shiftRecords: payload.shiftRecords
      };
      case SEARCH_PERFORMANCE:
        const shiftRecords = payload[0] || [];
        const partnerRecords = payload[1] || payload;
        return {
          ...state,
          loading: false,
          records: partnerRecords,
          shiftRecords: shiftRecords
        }
      default: 
        return state;
  }
}
