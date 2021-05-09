import React from 'react';
import { connect } from 'react-redux';
import './cart.css';
import { incrementItemQuantity, decrementItemQuantity, removeCartItem } from '../../actions/cartActions';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      increment: '',
      decrement: '',
      qunatity: ''
    }
  }

  componentDidMount() {
    this.setState({ qunatity: this.props.qunatity });
  }

  incrementQuantity = (e, id) => {
    e.preventDefault();
    this.setState({ qunatity: this.state.qunatity + 1 }, () => {
      let item = {
        id: id
      };
      this.props.incrementItemQuantity(item);
    })
  }

  decrementQuantity = (e, id) => {
    e.preventDefault();
    this.setState({ qunatity: this.state.qunatity - 1 }, () => {
      let item = {
        id: id
      };
      this.props.decrementItemQuantity(item);
    })
  }

  render() {
    return (
      <div>
        <div className="border cart">
          <div className="">
            <div className="row">
              <div className="col-md-2 col-sm-12">
                <img src={this.props.image} alt="cart-product-image" className="cart-product-image" />
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="cart-content">
                  <h5 className="mt-3"><strong>{this.props.productName}</strong></h5>
                  <h6 className="text-muted"><i class="fas fa-hashtag"></i>&nbsp;ITEM CODE : {this.props.itemCode}</h6>
                  <h6><i class="fas fa-weight"></i>&nbsp;QUANTITY : <strong>{this.props.qunatity}</strong></h6>
                  <h6><i class="fas fa-dollar-sign"></i>&nbsp;TOTAL PRICE: <strong>LKR {this.props.totalPrice}.00</strong></h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-center change-cart">
                  <button className="rounded-circle btn btn-dark btn-sm d-inline mt-3" 
                    style={{height: '50px', width: '50px'}}
                    onClick={e => this.decrementQuantity(e, this.props.cartId)}
                    disabled={this.state.qunatity === 1 ? true : false}
                  >
                    <i class="fas fa-caret-down fa-2x"></i>
                    </button>
                  <h1 className="d-inline">&nbsp;&nbsp;&nbsp;<strong className="cart-quantity">{this.state.qunatity}</strong>&nbsp;&nbsp;&nbsp;</h1>
                  <button className="d-inline rounded-circle btn btn-dark btn-sm mt-3" 
                    style={{height: '50px', width: '50px'}}
                    onClick={e => this.incrementQuantity(e, this.props.cartId)}
                  >
                    <i class="fas fa-caret-up fa-2x"></i>
                  </button>
                </div>
              </div>
              <div className="col-md-2">
                <button className="cart-delete btn btn-danger" style={{height: '100%', width: '100%'}}><i class="fas fa-trash fa-4x"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  incrementItemQuantity: item => {
    dispatch(incrementItemQuantity(item));
  },
  decrementItemQuantity: item => {
    dispatch(decrementItemQuantity(item));
  },
  removeCartItem: item => {
    dispatch(removeCartItem(item));
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);