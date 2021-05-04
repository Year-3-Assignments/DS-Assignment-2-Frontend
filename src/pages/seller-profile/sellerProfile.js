import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getUserAccount } from '../../actions/userActions';
import './sellerProfile.css';

const initialState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address_1: '',
  address_2: '',
  city: '',
  roles: [],
  imageUrl: ''
}

class SellerProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  state = initialState;

  componentDidMount() {
    this.props.getUserAccount();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getUser !== nextProps.getUser) {
      this.setState({
        id: nextProps.getUser.id,
        firstName: nextProps.getUser.firstName,
        lastName: nextProps.getUser.lastName,
        email: nextProps.getUser.email,
        phoneNumber: nextProps.getUser.phoneNumber,
        address_1: nextProps.getUser.address_1,
        address_2: nextProps.getUser.address_2,
        city: nextProps.getUser.city,
        imageUrl: nextProps.getUser.imageUrl,
        roles: nextProps.getUser.roles
      });
    }
  }

  render() {
    let { id, firstName, lastName, email, phoneNumber, address_1, address_2, city, imageUrl, roles } = this.state;

    return (
      <div className="mt-4">
        <div className="card seller-card">
          <div className="p-3 d-flex justify-content-center">
            <img src={imageUrl} className="card-img-top seller-image" alt="profile-image" />
          </div>
          <div className="card-body">
            <h6 className="card-title">{firstName}&nbsp;&nbsp;{lastName}</h6>
            {roles.map((role, index) => (
              <div key={index} className="mb-2">
                {_.isEqual(role.name, 'ROLE_SELLER') ? <span className="badge rounded-pill bg-warning text-dark">SELLER</span> : null}
                {_.isEqual(role.name, 'ROLE_BUYER') ? <span className="badge rounded-pill bg-info text-dark">SELLER</span> : null}
              </div>
            ))}
            <p className="card-text text-muted p-0 m-0 mb-1">{email}</p>
            <p className="card-text text-muted p-0 m-0 mb-2">{phoneNumber}</p>
            <h5 className="card-text p-0 m-0 mb-2">Address</h5>
            <p className="card-text text-muted p-0 m-0 mb-2">{address_1}, {address_2}, {city}</p>
            <div className="d-flex justify-content-center">
              <a href="#" className="btn btn-primary btn-sm btn-pill">EDIT PROFILE</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getUser: state.userReducer.getUser
});

const mapDispatchToProps = dispatch => ({
  getUserAccount: () => {
    dispatch(getUserAccount());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfile);