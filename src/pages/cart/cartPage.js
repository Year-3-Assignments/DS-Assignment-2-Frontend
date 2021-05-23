import React from 'react';
import './cart.css';
import { connect } from 'react-redux';
import { getCartItems } from '../../actions/cartActions';
import CartItem from './cartItem';
import currencyFormatter from 'format-currency';
import { Link } from 'react-router-dom';
import Payment from '../payment/paymentGateway';

let opts = { format: '%v %c', code: '' }
class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.makePayment = this.makePayment.bind(this);
    this.state = {
      items: [],
      newItems: [],
      isLoading: true,
      totalItems: 0,
      totalPrice: 0,
      isProceedClick: false,
      pendingItems: ''
    }
  }

  componentDidMount() {
    if (localStorage.getItem('id') !== null && localStorage.getItem('roles') !== null) {
      let user = {
        id: localStorage.getItem('id')
      };
      this.props.getCartItems(user);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getAllCartItems !== nextProps.getAllCartItems) {
      this.setState({ items: nextProps.getAllCartItems, isLoading: nextProps.isCartLoading }, () => {
        let items = 0;
        let price = 0;
        let pendingItems = 0;
        for (let i = 0; i < this.state.items.length; i++) {
          if (this.state.items[i].status === 'PENDING') {
            this.state.newItems.push(this.state.items[i])
            items += this.state.items[i].quantity;
            price += this.state.items[i].totalPrice;
            pendingItems = pendingItems + 1;
          }
        }
        this.setState({ totalItems: items, totalPrice: price, pendingItems: pendingItems });
      });
    }

    if (this.props.incrementItemQuantity !== nextProps.incrementItemQuantity) {
      if (localStorage.getItem('id') !== null && localStorage.getItem('roles') !== null) {
        let user = {
          id: localStorage.getItem('id')
        };
        this.props.getCartItems(user);
      }
    }

    if (this.props.decrementItemQuantity !== nextProps.decrementItemQuantity) {
      if (localStorage.getItem('id') !== null && localStorage.getItem('roles') !== null) {
        let user = {
          id: localStorage.getItem('id')
        };
        this.props.getCartItems(user);
      }
    }

    if (this.props.removeItem !== nextProps.removeItem) {
      if (localStorage.getItem('id') !== null && localStorage.getItem('roles') !== null) {
        let user = {
          id: localStorage.getItem('id')
        };
        this.props.getCartItems(user);
      }
    }
  } 

  makePayment = (e) => {
    e.preventDefault();
    this.setState({ isProceedClick: !this.state.isProceedClick })
  }

  render() {
    return (
      <div className="container cart-container">
        {!this.state.isLoading ?
          <div className="row">
            <div className="col-md-8">
            <h1 className="mt-4 mb-4"><i class="fas fa-shopping-cart"></i>&nbsp;<strong>My Cart</strong></h1>
            {!this.state.pendingItems > 0 ? 
              <h5 className="text-muted"><i>Please add items to cart</i></h5> 
            : 
              null
            }
            {this.state.items.map((item, index) => (
              <div key={index}>
                <CartItem 
                  productName={item.product.productName} 
                  image={item.product.imageUrl} 
                  qunatity={item.quantity}
                  totalPrice={item.totalPrice}
                  productPrice={item.product.unitPrice}
                  itemCode={item.product.itemCode}
                  cartId={item.cartId}
                  status={item.status}
                />
              </div>
            ))}
            </div>
            {this.state.pendingItems > 0 ?
              <div className="col-md-4">
                <div className="border mt-4">
                  <div className="p-3">
                    <h5><strong>Order Summary</strong></h5>
                    <p className="m-0 p-0 cart-summary-text">Total Items : {this.state.totalItems}</p>
                    <p className="mb-2 p-0 cart-summary-text">Total Price : Rs. {currencyFormatter(this.state.totalPrice, opts)}</p>
                    {!this.state.isProceedClick ?
                      <button className="btn btn-block btn-dark checkout-btn" onClick={this.makePayment}>PROCEED TO CHECKOUT</button>
                    :
                      <button className="btn btn-block btn-dark checkout-btn" onClick={this.makePayment}>CENCEL</button>
                    }
                  </div>
                </div>
                {this.state.isProceedClick ? <Payment amount={this.state.totalPrice} items={this.state.newItems} /> : null}
              </div>
            :
              null
            }
          </div>
        :
          <div className="text-center page-loading">
            <div className="align-text-bottom">
              <div className="spinner-border" role="status" style={{width: '5rem', height: '5rem'}}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllCartItems: state.cartReducer.getAllCartItems,
  isCartLoading: state.cartReducer.loading,
  incrementItemQuantity: state.cartReducer.incrementItemQuantity,
  decrementItemQuantity: state.cartReducer.decrementItemQuantity,
  removeItem: state.cartReducer.removeItem
});

const mapDispatchToProps = dispatch => ({
  getCartItems: user => {
    dispatch(getCartItems(user));
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);