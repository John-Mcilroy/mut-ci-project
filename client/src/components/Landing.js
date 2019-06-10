import React, { Component } from 'react';

import logo from '../assets/placeholder-logo.png';
import landingImg from '../assets/landingImg.png';

class Landing extends Component {
  state = {
    isLogin: true
  };
  
  constructor(props) {
    super(props);

    this.usernameElRef = React.createRef();
    this.passwordElRef = React.createRef();
    this.authCodeElRef = React.createRef();
  }
  
  
  onChange = (event) => {
    event.preventDefault();

    let authCode;
    if(this.state.isLogin === false) {
      authCode = this.authCodeElRef.current.value;
    }

    const username = this.usernameElRef.current.value;
    const password = this.passwordElRef.current.value;


    if(
      username.trim().length === 0 && 
      password.trim().length === 0 && 
      (
        this.state.isLogin === false ? authCode.trim().length === 0 : true
      )
    ) {
      this.setState(prevState => {
        return { isLogin: !prevState.isLogin };
      })
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
              ref={this.authCodeElRef} 
            />
            <input 
              id="username"
              className="auth-form__input"
              type="text" 
              placeholder="Username" 
              ref={this.usernameElRef}
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

export default Landing;