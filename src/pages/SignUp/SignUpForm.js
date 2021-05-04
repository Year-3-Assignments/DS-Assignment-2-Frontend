import React from 'react';
import firebase from '../../firebase.config';
import Progress from '../../components/progress/Progress';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createUserAccount } from '../../actions/userActions';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address_1: '',
  address_2: '',
  city: '',
  postalCode: '',
  userName: '',
  password_1: '',
  password_2: '',
  roles: [],
  profileImage: null,
  imageUrl: '',
  uploadPercentage: 0,
  formNotValid: false,
  authenticationData: ''
}

let formData = {};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.setUploadPercentage = this.setUploadPercentage.bind(this);
    this.setImageUrl = this.setImageUrl.bind(this);
    this.setImage = this.setImage.bind(this);
    this.onUserRoleChange = this.onUserRoleChange.bind(this);
  }

  state = initialState;

  componentWillReceiveProps = (nextProps) => {
    if (this.props.setUser !== nextProps.setUser) {
      this.setState({ authenticationData: nextProps.setUser }, () => {
        localStorage.setItem('id', this.state.authenticationData.id);
        localStorage.setItem('username', this.state.authenticationData.username);
        localStorage.setItem('roles', this.state.authenticationData.roles);
        localStorage.setItem('Authorization', `${this.state.authenticationData.tokenType} ${this.state.authenticationData.accessToken}`);
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onUserRoleChange(e) {
    if (e.target.checked) {
      this.state.roles.push(e.target.value);
    } else {
      _.remove(this.state.roles, 'seller');
    }
  }

  setImage = (e) => {
    this.setState({ profileImage: e.target.files[0] });
  }

  setUploadPercentage = (progress) => {
    this.setState({ uploadPercentage: progress });
  }

  setImageUrl = ({imageUrl}) => {
    this.setState({ imageUrl: imageUrl }, () => {
      console.log('image url', this.state.imageUrl)
    });
  }

  uploadImage =(e) => {
    e.preventDefault();
    if (this.state.profileImage !== null) {
      let folderName = 'Profile-Pictures';
      let file = this.state.profileImage;
      let upload = firebase.storage().ref(`${folderName}/${this.state.userName}`).put(file);

      upload.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setUploadPercentage(progress);
      }, (error) => {
        console.log(error);
      }, () => {
        upload.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          this.setImageUrl({ imageUrl: url });
        });
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map(key => {
        return key !== null;
      });

      if (!data.includes(false)) {
        let userData = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          username: this.state.userName,
          email: this.state.email,
          address_1: this.state.address_1,
          address_2: this.state.address_2,
          city: this.state.city,
          password: this.state.password_1,
          imageUrl: this.state.imageUrl,
          role: this.state.roles
        };

        console.log('DATA TO SEND', userData);
        this.props.createUserAccount(userData);
        NotificationManager.success('User account successfully created', 'Success')
      } else {
        this.setState({ formNotValid: true }, () => {
          NotificationManager.warning('Issue with input fields', 'Please check the input fields');
        });
      }
    }
  }

  validateForm() {
    const data = {
      firstname: this.state.firstName && this.state.firstName.trim().length > 0 ? this.state.firstName : null,
      lastname: this.state.lastName && this.state.lastName.trim().length > 0 ? this.state.lastName : null,
      email: this.state.email && this.state.email.trim().length > 0 ? this.state.email : null,
      phonenumber: this.state.phoneNumber && this.state.phoneNumber.trim().length > 0 ? this.state.phoneNumber : null,
      address1: this.state.address_1 && this.state.address_1.trim().length > 0 ? this.state.address_1 : null,
      address2: this.state.address_2 && this.state.address_2.trim().length > 0 ? this.state.address_2 : null,
      city: this.state.city && this.state.city.trim().length > 0 ? this.state.city : null,
      postalcode: this.state.postalCode && this.state.postalCode.trim().length > 0 ? this.state.postalCode : null,
      username: this.state.userName && this.state.userName.trim().length > 0 ? this.state.userName : null,
      password1: this.state.password_1 && this.state.password_1.trim().length > 0 ? this.state.password_1 : null,
      password2: this.state.password_2 && this.state.password_2.trim().length > 0 ? this.state.password_2 : null,
      image: this.state.imageUrl && this.state.imageUrl.trim().length > 0 ? this.state.imageUrl : null,
    };

    formData = Object.assign({}, data);
    return true;
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="border signup-form"  style={{width: '650px'}}>
          <form className="m-4">
            <h5>Create New Account</h5>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="first-name" className="form-label">First Name</label>
                <input type="text" id="first-name" className="form-control" value={this.state.firstName.toUpperCase()} name="firstName" onChange={this.onChange} />
                {formData.firstname===null && this.state.formNotValid ? <span className="form__help_danger">First name is required</span> : null}
              </div>
              <div className="col">
                <label htmlFor="last-name" className="form-label">Last Name</label>
                <input type="text" id="last-name" className="form-control" value={this.state.lastName.toUpperCase()} name="lastName" onChange={this.onChange} />
                {formData.lastname===null && this.state.formNotValid ? <span className="form__help_danger">Last name is required</span> : null}
              </div>
            </div>

            <div className="row m-0 mb-3">
              <label htmlFor="email" className="form-label p-0">Email Address</label>
              <input type="text" id="email" className="form-control" value={this.state.email.toUpperCase()} name="email" onChange={this.onChange} />
              {formData.email===null && this.state.formNotValid ? <span className="form__help_danger p-0">Email is required</span> : null}
            </div>

            <div className="row m-0 mb-3">
              <label htmlFor="phone-number" className="form-label p-0">Phone Number</label>
              <input type="text" id="phone-number" className="form-control" value={this.state.phoneNumber} name="phoneNumber" onChange={this.onChange} />
              {formData.phonenumber===null && this.state.formNotValid ? <span className="form__help_danger p-0">Phone Number is required</span> : null}
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="address-1" className="form-label">Address Line 1</label>
                <input type="text" id="address-1" className="form-control" value={this.state.address_1.toUpperCase()} name="address_1" onChange={this.onChange} />
                {formData.address1===null && this.state.formNotValid ? <span className="form__help_danger">Address line 1 is required</span> : null}
              </div>
              <div className="col">
                <label htmlFor="address-2" className="form-label">Address Line 2</label>
                <input type="text" id="address-2" className="form-control" value={this.state.address_2.toUpperCase()} name="address_2" onChange={this.onChange} />
                {formData.address2===null && this.state.formNotValid ? <span className="form__help_danger">Address line 2 is required</span> : null}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" id="city" className="form-control" value={this.state.city.toUpperCase()} name="city" onChange={this.onChange} />
                {formData.city===null && this.state.formNotValid ? <span className="form__help_danger">City is required</span> : null}
              </div>
              <div className="col">
                <label htmlFor="postal-code" className="form-label">Postal Code</label>
                <input type="number" id="postal-code" className="form-control" value={this.state.postalCode} name="postalCode" onChange={this.onChange} />
                {formData.postalcode===null && this.state.formNotValid ? <span className="form__help_danger">Postal code is required</span> : null}
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="city" className="form-label">Username</label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1" style={{fontSize: '13px'}}>@</span>
                <input type="text" className="form-control" value={this.state.userName.toUpperCase()} name="userName" onChange={this.onChange} />
              </div>
              {formData.username===null && this.state.formNotValid ? <span className="form__help_danger">Username is required</span> : null}
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="password-1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password-1" value={this.state.password_1} name="password_1" onChange={this.onChange} />
                {formData.password1===null && this.state.formNotValid ? <span className="form__help_danger">Password is required</span> : null}
              </div>
              <div className="col">
                <label htmlFor="password-2" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="password-2"  value={this.state.password_2} name="password_2" onChange={this.onChange} />
                {formData.password2===null && this.state.formNotValid ? <span className="form__help_danger">Confirm password is required</span> : null}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="profile-image" className="form-label">Profile Image</label>
              <div className="input-group">
                <input type="file" className="form-control" id="profile-image" onChange={e => this.setImage(e)} />
                <button className="btn btn-outline-primary btn-sm" type="button" onClick={this.uploadImage}>UPLOAD</button>
              </div>
              {formData.image===null && this.state.formNotValid ? <span className="form__help_danger">Profile image is required</span> : null}
            </div>

            <div className="mb-3">
              <Progress percentage={this.state.uploadPercentage} />
            </div>

            <div className="row mb-3">
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="1" value="seller" onChange={e => this.onUserRoleChange(e)} />
                  <label className="form-check-label">
                    SELLER ACCOUNT
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="2" value="buyer" onChange={e => this.onUserRoleChange(e)}/>
                  <label className="form-check-label">
                    SELLER ACCOUNT
                  </label>
                </div>
              </div>
            </div>

            <div className="float-end mb-4 mt-3">
              <button type="button" className="btn btn-outline-primary btn-pill" onClick={this.onSubmit}>CREATE MY ACCOUNT</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  setUser: state.userReducer.setUser
});

const mapDispatchToProps = dispatch => ({
  createUserAccount: user => {
    dispatch(createUserAccount(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);