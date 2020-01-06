import {
  SHOW_UPLOADED_PERFORMANCE,
  SEARCH_PERFORMANCE
} from '../actions/types';

const initialState = {
  viewType: 'day',
  loading: true,
  records: [],
  shiftRecords: [],
  startDate: '',
  endDate: ''
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
        const partnerRecords = payload[1] || [];
        const startDate = payload[2] || '';
        const endDate = payload[3] || ''

        return {
          ...state,
          loading: false,
          records: partnerRecords,
          shiftRecords: shiftRecords,
          startDate,
          endDate
        }
      default: 
        return state;
  }
}
