import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import uploadModal from './uploadModal';
import performanceUpload from './performanceUpload';
import setPerformance from './setPerformace';

export default combineReducers({
  alert,
  auth,
  profile,
  uploadModal,
  performanceUpload,
  setPerformance
});
