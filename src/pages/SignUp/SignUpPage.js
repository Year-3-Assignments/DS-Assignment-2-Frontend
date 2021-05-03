import React from 'react';
import './signUp.css';
import SignUpForm from './signUpForm';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="body mt-4">
        <SignUpForm />   
      </div>
    )
  }
}