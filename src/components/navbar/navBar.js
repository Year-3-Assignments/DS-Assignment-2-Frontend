import React from 'react';
import './navBar.css'
import { getUserAccount } from '../../actions/userActions';
import { getCartItems } from '../../actions/cartActions';
import { connect } from 'react-redux';
import DefaultUserImage from '../../assets/default-user-image.svg';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfileImage: '',
      cartItems: [],
      totalCartItems: ''
    }
  }

  componentDidMount() {
    this.props.getUserAccount();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getUser !== nextProps.getUser) {
      this.setState({ userProfileImage: nextProps.getUser.imageUrl });
    }
  }

  logoutAccount = (e) => {
    e.preventDefault();
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('Authorization');
    window.location = "/";
  }

  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-light bg-light navbar-expand-sm shopping-nav">
          <a className="navbar-brand" href="#">
            ShopaFy
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-list-4">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/"><i className="fas fa-home"></i>&nbsp;Home</Link>
              </li>
              {localStorage.getItem("id") === null && localStorage.getItem("roles") === null ?
                <li className="nav-item">
                  <Link className="nav-link" to="/signup"><i className="fas fa-user-plus"></i>&nbsp;Sign In</Link>
                </li>
              :
                null
              }
              {localStorage.getItem("id") === null && localStorage.getItem("roles") === null ?
                <li className="nav-item">
                  <Link className="nav-link" to="/login"><i class="fas fa-sign-in-alt"></i>&nbsp;Login In</Link>
                </li>
              :
                null
              }
              {localStorage.getItem("roles") === "ROLE_BUYER" ? 
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="fas fa-shopping-cart"></i>
                    &nbsp;
                    My Cart
                  </Link>
                </li> 
              : 
                null
              }
              {localStorage.getItem("roles") === "ROLE_BUYER" ? 
                <li className="nav-item">
                  <Link className="nav-link" to="/delivery">
                    <i className="fas fa-truck"></i>
                    &nbsp;
                    Deliveries
                  </Link>
                </li> 
              : 
                null
              }
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown dropstart">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={this.state.userProfileImage && this.state.userProfileImage.length > 0 ? this.state.userProfileImage : DefaultUserImage} width="40" height="40" className="rounded-circle" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link className="dropdown-item" to="/me">MY PROFILE</Link>
                  <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#logout">LOGOUT</a>
                </ul>
              </li>   
            </ul>
          </div>
        </nav>

        <div className="modal fade mt-5" id="logout" tabIndex="-1" role="dialog" data-backdrop="static">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title logout-modal-title" id="exampleModalLabel">Confirm Delete</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              
              <div className="modal-body logout-modal-body">
                Do you want to logout?
              </div>
              
              <div className="modal-footer d-flex justify-content-center">
                <div>
                  <button type="submit" className="btn btn-dark btn-pill" onClick={this.logoutAccount}>Yes</button>
                  <button type="button" className="btn btn-light btn-pill mx-2" data-bs-dismiss="modal">No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    )
  }
}

const mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
});

const mapDispatchToProps = dispatch => ({
  getUserAccount: () => {
    dispatch(getUserAccount());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
