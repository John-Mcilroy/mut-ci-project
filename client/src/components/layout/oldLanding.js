import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

import logo from '../../assets/placeholder-logo.png';
import landingImg from '../../assets/landingImg.png';

import '../stylesheets/Landing.css';


class Landing extends Component {
  state = {
    isLogin: true
  };
  
  constructor(props) {
    super(props);

    this.nameElRef = React.createRef();
    this.passwordElRef = React.createRef();
    this.refWordElRef = React.createRef();
  }
  
  onChange = async (event) => {
    event.preventDefault();

    let refWord = '';
    
    const name = this.nameElRef.current.value;
    const password = this.passwordElRef.current.value;
    
    if(!this.state.isLogin) refWord = this.refWordElRef.current.value;
    
    if(
      // If both fields are empty
      name.trim().length === 0 && 
      password.trim().length === 0 && 
      (
        // Only if !isLogin, check refWord is empty
        this.state.isLogin === false ? refWord.trim().length === 0 : true
      )
      ) {
        this.setState(prevState => {
          return { isLogin: !prevState.isLogin };
        })
        return
      }

    const newUser = {
      name,
      password
    }

    if (!this.state.isLogin) {
      newUser.refWord = refWord;
    }

    try {
      const config = {
        headers: {'Content-Type': 'application/json'}
      }

      const body = JSON.stringify(newUser);

      if (!this.state.isLogin) {
        // Register user
        const res = await axios.post('/api/users', body, config);
        this.props.setAlert(res.data);
      } else {
        // Login user
        const res = await axios.post('/api/auth', body, config);
        console.log(res.data);
      }
    } catch(err) {
      console.error(err.response.data);
    }

  }

  render() {

    return (
      <div className="landing-container">
        
        {/* Auth Form */}
        <div className="auth">
          
          <header className="auth-head">
            <img
              src={logo} 
              alt="Performance Tracker Logo" className="auth-head__heading"
            />
          </header>

          <form className="auth-form" onSubmit={this.onChange}>
            <input 
              id="auth-code"
              className={this.state.isLogin ? "auth-form__input auth-form__auth-code__hidden" : "auth-form__input auth-form__auth-code "}
              type="password"
              placeholder="Registration Code" 
              ref={this.refWordElRef} 
            />
            <input 
              id="username"
              className="auth-form__input"
              type="text" 
              placeholder="Name" 
              ref={this.nameElRef}
            /><br />
            <input 
              id="password"
              className="auth-form__input"
              type="password" 
              placeholder="Password" 
              ref={this.passwordElRef}  
            /><br />

            <button
              type="submit" 
              className="auth-form__btn"
            >
              {this.state.isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          
          
          <ul className="footer-list">
            <li className="footer-list__register"><h6>Report a Bug</h6></li>
            <li className="footer-list__copy"><h6>&copy; 2019 MUT. All Rights Reserved</h6></li>
          </ul>
        </div>
        
        {/* Showcase Image */}
        
        <img className="landing-logo" src={landingImg} alt="Landing Logo" />
        
      </div>
    )
  }
}

Landing.propTypes = {
  setAlert: PropTypes.func.isRequired,
}

export default connect(
  null, 
  { 
    setAlert 
  }
)(
  Landing
);