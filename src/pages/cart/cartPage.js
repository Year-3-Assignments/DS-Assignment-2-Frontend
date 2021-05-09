import React from 'react';
import './cart.css';
import { connect } from 'react-redux';
import { getCartItems } from '../../actions/cartActions';
import CartItem from './cartItem';

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: true
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
      this.setState({ 
        items: nextProps.getAllCartItems,
        isLoading: nextProps.isCartLoading
      });
    }
  } 

  render() {
    return (
      <div className="container cart-container">
        {!this.state.isLoading ?
          <div className="row">
            <div className="col-md-8">
            <h1 className="mt-4 mb-4"><i class="fas fa-shopping-cart"></i>&nbsp;<strong>My Cart</strong></h1>
            {this.state.items.map((item, index) => (
              <div key={index}>
                <CartItem 
                  productName={item.product.productName} 
                  image={item.product.imageUrl} 
                  qunatity={item.quantity}
                  totalPrice={item.totalPrice}
                  itemCode={item.product.itemCode}
                  cartId={item.cartId}
                />
              </div>
            ))}
            </div>
            <div className="col-md-4">

            </div>
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
  isCartLoading: state.cartReducer.loading
});

const mapDispatchToProps = dispatch => ({
  getCartItems: user => {
    dispatch(getCartItems(user));
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);