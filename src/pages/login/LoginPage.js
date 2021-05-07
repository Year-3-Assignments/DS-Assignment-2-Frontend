import React, { useState } from "react";
import './Login.css';
import { connect } from "react-redux";




const LoginPage = props => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        
        return(
            <div className="wrapper">
            <div className="border login-form"  style={{width: '650px'}}>
            <form className="form-signin">       
              <h2 className="form-signin-heading">Please login</h2><br></br>
              <input type="text" className="form-control" name="username" placeholder="Username" onChange={e => setUsername(e.target.value)} required="" autofocus="" />
              <input type="password" className="form-control" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required=""/>      
              <label className="checkbox">
                <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
              </label>
              <br></br>
             <button className="btn btn-lg btn-primary btn-block"   type="submit"  onClick={() => props.dispatch({ type: "FORM_SUBMIT", payload: { username, password }})}><a href="/"  role="button" aria-disabled="true">Login</a></button> 
            </form>
            </div>
          </div>
        )
    }
    


const mapStateToProps = state => ({
    loginForm: state.loginForm
  });
  
  export default connect(mapStateToProps)(LoginPage);