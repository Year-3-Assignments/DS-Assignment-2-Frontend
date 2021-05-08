import React from "react";
import './login.css';
import { connect } from "react-redux";
import { loginUser } from '../../actions/userActions';
import NotificationManager from "../../components/notifications/notificationCreator";

let formData = {};
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.state = {
      userName: '',
      password: '',
      isLogginIn: false,
      formNotValid: false,
      isAlertOpen: false,
      isLoginSuccess: '',
      loginResponse: '',
      isLoginClicked: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.loginDetails !== nextProps.loginUser) {
      this.setState({ loginResponse: nextProps.loginDetails }, () => {
        if (this.state.loginResponse && this.state.loginResponse != 'Error' && this.state.loginResponse !== null) {
          localStorage.setItem('id', this.state.loginResponse.id);
          localStorage.setItem('username', this.state.loginResponse.username);
          localStorage.setItem('roles', this.state.loginResponse.roles);
          localStorage.setItem('Authorization', `${this.state.loginResponse.tokenType} ${this.state.loginResponse.accessToken}`);

          switch (this.state.loginResponse.roles[0]) {
            case 'ROLE_SELLER':
              window.location = "/me";
              break;
            case 'ROLE_BUYER':
              window.location = "/";
              break;
            default:
              window.location = "/";
          }
          this.setState({ 
            isLoginSuccess: true,
            isLoginClicked: nextProps.isLogin
          });
        } else {
          this.setState({ isLoginSuccess: false });
        }
      });
    }

    if (this.props.loginUserError !== nextProps.loginUserError) {
      this.setState({ loginResponse: nextProps.loginUserError }, () => {
        if (this.state.loginResponse && this.state.loginResponse === 'Error') {
          this.setState({ isLoginSuccess: false, isLoginClicked: nextProps.isLogin });
        } else {
          this.setState({ isLoginSuccess: '', isLoginClicked: nextProps.isLogin });
        }
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm() {
    const data = {
      username: this.state.userName && this.state.userName.trim().length > 0 ? this.state.userName : null,
      password: this.state.password && this.state.password.trim().length > 0 ? this.state.password : null
    };
    formData = Object.assign({}, data);
    return true;
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map(key => {
        return key !== null;
      });

      if (!data.includes(false)) {
        let loginDetails = {
          username: this.state.userName.toLowerCase(),
          password: this.state.password
        };
        
        this.setState({ isLoginClicked: true });
        this.props.loginUser(loginDetails);
      } else {
        this.setState({ formNotValid: true, isAlertOpen: true });
      }
    }
  }

  render() {
    return(
      <div>
        {this.state.isAlertOpen ? <NotificationManager type={'warning'} message={'Please check the input fields'} isOpen={this.state.isAlertOpen} /> : null}
        {this.state.isLoginSuccess === false ? <NotificationManager type={'error'} message={'Username or password is wronge'} isOpen={true} /> : null} 
        {this.state.isLoginSuccess === true ? <NotificationManager type={'success'} message={'Login success'} isOpen={true} /> : null} 
        <div className="wrapper d-flex justify-content-center">
          <form style={{width: '450px'}} className="border login-form p-3">
            <h5>Login to ShopaFy</h5>
            <div className="mb-3">
              <label htmlFor="user-name" className="form-label">Username</label>
              <input type="email" className="form-control" id="user-name" 
                name="userName" 
                onChange={this.onChange} 
                value={this.state.userName.toUpperCase()} 
              />
              {formData.username===null && this.state.formNotValid ? <span className="form__help_danger p-0">Username is required</span> : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" 
                name="password" 
                onChange={this.onChange} 
                value={this.state.password} 
              />
              {formData.password===null && this.state.formNotValid ? <span className="form__help_danger p-0">Password is required</span> : null}
            </div>
            <a href="/signup" style={{textDecoration: 'none'}}>Create new account</a>
            <div className="d-flex justify-content-end">
              {!this.state.isLoginClicked ? 
                <a href="#" className="btn btn-dark btn-sm btn-pill" onClick={this.onSubmit}>LOGING</a>
              :
                <button className="btn btn-dark btn-pill btn-sm" type="button">
                  <span className="spinner-border spinner-border-sm pt-0" role="status" aria-hidden="true"></span>
                  <span className="ml-2">LOGING IN...</span>
                </button>
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  loginDetails: state.userReducer.loginUser,
  loginUserError: state.userReducer.loginUserError,
  isLogin: state.userReducer.loading
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => {
    dispatch(loginUser(user));
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);