import React, {Component} from 'react';
import './SignUp.css';

export default class SignUp extends Component {

  render() {
    return (
      <div id='sign-up-page'>
        <form id='sign-up-form'>
          <div id='sign-up-title'>
            Sign Up  
          </div>
          <input type="text" id="username" className="sign-up-text" placeholder="username"></input>
          <input type="text" id="pass1" className="sign-up-text" placeholder="password"></input>
          <input type="text" id="pass2" className="sign-up-text" placeholder="password"></input>
          <button id="sign-up-button">Sign up</button>
        </form>
      </div>
    );
  }
}