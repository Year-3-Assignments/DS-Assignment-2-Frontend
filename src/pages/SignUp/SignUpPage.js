import React from 'react';
import './signUp.css';
import SignUpForm from './signUpForm';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="body" style={{marginTop: '70px'}}>
        <SignUpForm />   
      </div>
    )
  }
}