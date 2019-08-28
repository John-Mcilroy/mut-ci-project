import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import upload from './upload';

export default combineReducers({
  alert,
  auth,
  profile,
  upload
});