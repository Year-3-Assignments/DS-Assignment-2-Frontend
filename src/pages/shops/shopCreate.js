import React from 'react';
import { createNewShop, getSellerShops } from '../../actions/shopAcions';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';

const initialState = {
  shopName: '',
  shopPhoneNumber: '',
  user: '',
  isFormNotValid: false
}

let formData = {};

class ShopCreate extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  state = initialState;

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map(key => {
        return key !== null;
      });

      if (!data.includes(false)) {
        let shop = {
          shopName: this.state.shopName,
          phoneNumber: this.state.shopPhoneNumber,
          user: {
            id: localStorage.getItem("id")
          }
        };
        this.props.createNewShop(shop);
        NotificationManager.success('Shop Created', 'New shop added successfully');
      } else {
        this.setState({ isFormNotValid: true }, () => {
          NotificationManager.warning('Issue with input fields', 'Please check the input fields');
        });
      }
    }
  }

  validateForm() {
    const data = {
      shopname: this.state.shopName && this.state.shopName.trim().length > 0 ? this.state.shopName : null,
      shopphonenumber: this.state.shopPhoneNumber && this.state.shopPhoneNumber.trim().length > 0 ? this.state.shopPhoneNumber : null
    }

    formData = Object.assign({}, data);
    return true;
  }

  render() {
    let { shopName, shopPhoneNumber, isFormNotValid } = this.state;
    return (
      <div className="mt-4">
        <div className="border p-3">
          <form>
            <h5>Create a New Shop</h5>
            <div className="row m-0 mb-3">
              <label htmlFor="shop-name" className="form-label p-0 create-shop">Shop Name</label>
              <input type="text" id="shop-name" className="form-control" name="shopName" value={shopName} onChange={this.onChange} />
              {formData.shopname===null && isFormNotValid ? <span className="form__help_danger p-0">Shop name is required</span> : null}
            </div>

            <div className="row m-0 mb-3">
              <label htmlFor="shop-phone-number" className="form-label p-0 create-shop">Phone Number</label>
              <input type="number" id="shop-phone-number" className="form-control" name="shopPhoneNumber" value={shopPhoneNumber} onChange={this.onChange} />
              {formData.shopphonenumber===null && isFormNotValid ? <span className="form__help_danger p-0">Phone number is required</span> : null}
            </div>

            <div className="d-flex justify-content-end">
              <a href="#" className="btn btn-info btn-sm btn-pill" onClick={this.onSubmit}>CREATE SHOP</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  setShop: state.userReducer.setShop
});

const mapDispatchToProps = dispatch => ({
  createNewShop: shop => {
    dispatch(createNewShop(shop));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopCreate);