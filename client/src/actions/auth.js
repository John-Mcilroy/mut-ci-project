import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { 
  REGISTER_SUCCESS, 
  REGISTER_FAIL, 
  USER_LOADED,  
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types'

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    
  } catch(err) {

  }
}

// Register User
export const register = ({ name, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }  

  const body = JSON.stringify({ name, password });

  try {
    const res = await axios.post('api/users', body, config);

    dispatch(setAlert('Register Successful', 'success'));
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    
    dispatch(loadUser())
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors) errors.forEach( error => dispatch(setAlert( error.msg, 'fail' )) );

    dispatch({
      type: REGISTER_FAIL
    });

  }
}

// Login User
export const login =({ name, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }  

  const body = JSON.stringify({ name, password });

  try {
    const res = await axios.post('api/auth', body, config);

    dispatch(setAlert('Login Successful', 'success'));
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors) errors.forEach( error => dispatch(setAlert( error.msg, 'fail' )) );

    dispatch({
      type: LOGIN_FAIL
    });
  }
}

// Logout: Clear Profile

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
}