import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Redux Actions
import { setAlert } from '../../actions/alert';
import { register, login } from '../../actions/auth';

import landingImg from '../../assets/landingImg.png';

import '../stylesheets/Landing.css';


const Landing = ({ setAlert, register, login, isAuthenticated }) => {
  const [ formType, setFormType ] = useState({ isLogin: true });
  const [ nameValue, setNameValue ] = useState('');
  const [ passwordValue, setPasswordValue ] = useState('');
  const [ referenceValue, setReferenceValue ] = useState('');

  const { isLogin } = formType;
  const name = nameValue;
  const password = passwordValue;
  const reference = referenceValue;
  
  
  const onChange = async (event) => {
    event.preventDefault();
    if(
      // If both fields are empty
      name.trim().length === 0 && 
      password.trim().length === 0 && 
      (
        // Only if !isLogin, check reference is empty
        isLogin === false ? reference.trim().length === 0 : true
        )
        ) {
          setFormType({
            isLogin: !formType.isLogin
          });
          return;
        }
        
        const newUser = {
          name,
          password,
          reference,
        }
        
        if (!isLogin) {
          newUser.reference = reference;
        }
        
    try {
      
      if (!isLogin) {
        // Register user
        register({ name, password, reference });
        //setAlert('Registration Successful', 'success');
      } else {
        // Login user
        login({ name, password });
      }
    } catch(err) {
      console.error(err.response.data);
      setAlert('Invalid Credentials', 'fail')
    }
  }

  // If user is logged in, redirect to users profile
  if(isAuthenticated) {
    return <Redirect to='/profile' />
  }

  return <div className="landing-container">      
  
  <div className="auth">
    
    <div className="auth">
      <header className="auth-head__heading">
        MUT <br /> <span className="auth-head__title">Management Utility Tool</span>
      </header>

    <form className="auth-form" onSubmit={onChange} autoComplete='off'>
      <input 
        id="auth-code"
        className={isLogin ? "auth-form__input auth-form__auth-code__hidden" : "auth-form__input auth-form__auth-code "}
        type="password"
        value={reference}
        onChange={e => setReferenceValue(e.target.value)}
        placeholder="Registration Code" 
      />
      <input 
        id="username"
        className="auth-form__input"
        type="text" 
        value={name}
        onChange={e => setNameValue(e.target.value)}
        placeholder="Name" 
      /><br />
      <input 
        id="password"
        className="auth-form__input"
        type="password" 
        value={password}
        onChange={e => setPasswordValue(e.target.value)}
        placeholder="Password" 
      /><br />

      <button
        type="submit" 
        className="auth-form__btn"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>
    </form>
    
    
    <ul className="footer-list">
      <li className="footer-list__register"><h6>Report a Bug</h6></li>
      <li className="footer-list__copy"><h6>&copy; 2019</h6></li>
    </ul>
    </div>
  </div>
  
  <img className="landing-logo" src={landingImg} alt="Landing Logo" />
  
</div>
}

Landing.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { setAlert, register, login })(Landing);

