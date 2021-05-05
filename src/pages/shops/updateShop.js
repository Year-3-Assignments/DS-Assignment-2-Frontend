import React from 'react';
import { connect } from 'react-redux';
import { updateSellerShop, setUpdateSellerShop } from '../../actions/shopAcions';

const initialState = {
  id:'',
  shopName: '',
  shopPhoneNumber: '',
  user: '',
  isFormNotValid: false,
  shop: ''
}

const $ = window.$;
let formData = {};

class UpdateShop extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  state = initialState;

  componentDidMount() {
    this.setState({
      shop: this.props.setUpdateShop,
      shopName: this.props.setUpdateShop.shopName,
      shopPhoneNumber: this.props.setUpdateShop.phoneNumber,
      user: this.props.setUpdateShop.user,
      id: this.props.setUpdateShop.id
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.setUpdateShop !== nextProps.setUpdateShop) {
      this.setState({ 
        shop: nextProps.setUpdateShop,
        shopName: nextProps.setUpdateShop.shopName,
        shopPhoneNumber: nextProps.setUpdateShop.phoneNumber,
        user: nextProps.setUpdateShop.user,
        id: nextProps.setUpdateShop.id
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm() {
    const data = {
      shopname: this.state.shopName && this.state.shopName.trim().length > 0 ? this.state.shopName : null,
      shopphonenumber: this.state.shopPhoneNumber && this.state.shopPhoneNumber.trim().length > 0 ? this.state.shopPhoneNumber : null
    }

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
        let shop = {
          id: this.state.id,
          shopName: this.state.shopName,
          phoneNumber: this.state.shopPhoneNumber,
          user: {
            id: this.state.shop.user.id
          }
        };
        console.log('DATA TO SEND', shop);
        this.props.updateSellerShop(shop);
        this.props.setUpdateSellerShop('');
        $("#update-shop").modal("toggle");
      } else {
        this.setState({ isFormNotValid: true });
      }
    }
  }

  render() {
    let { shop, isFormNotValid, shopName, shopPhoneNumber } = this.state;
    return (
      <div className="modal fade" id="update-shop" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Shop</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light btn-sm btn-pill" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-info btn-sm btn-pill" onClick={this.onSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  setUpdateShop: state.shopReducer.setUpdateShop
});

const mapDispatchToProps = dispatch => ({
  updateSellerShop: shop => {
    dispatch(updateSellerShop(shop));
  },
  setUpdateSellerShop: shop => {
    dispatch(setUpdateSellerShop(shop))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateShop);