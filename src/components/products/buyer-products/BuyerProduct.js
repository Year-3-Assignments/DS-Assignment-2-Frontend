import React from 'react';
import './BuyerProduct.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addItemToCart } from '../../../actions/cartActions';
import { Link } from 'react-router-dom';

class BuyerProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getAllCartItems !== nextProps.getAllCartItems) {
      this.setState({ isAdding: nextProps.isAdding });
    }
  }

  setSingleProductPage = (e, id) => {
    e.preventDefault();
    window.location = `/product/${id}`;
  }

  addToCart = (e, productId) => {
    e.preventDefault();
    this.setState({ isAdding: true });
    if (!_.isEqual(localStorage.getItem("username"), null)) {
      let item = {
        quantity: 1,
        user: {
          id: localStorage.getItem('id')
        },
        products: [{
          id: productId
        }]
      }
      console.log('item', item);
      this.props.addItemToCart(item);
    } else {
      window.location = "/login"
    }
  }

  render() {
    return (
      <Link to={`/product/${this.props.productId}`} style={{textDecoration: 'none', color: 'black'}}>
        <div className="card buyer-product-card">
            <div className="product-image" style={{cursor: 'pointer'}}> 
              <div className="card-img-actions"> 
                <img src={this.props.productImage} alt="product image" className="card-img buyer-product-img" />
              </div>
            </div>
          <div className="card-body p-0 m-0">
            <h5 className="card-title buyer-product-cart-title mt-1 mb-1 d-flex justify-content-center">{this.props.productName}</h5>
            <p className="card-text mb-1 d-flex justify-content-center">LKR. {this.props.price}.00</p>  
            <div className="d-flex justify-content-center">
              {this.props.quantity === 0 ? 
                <span class="badge  quantity-bg text-dark rounded-pill mb-2 pl-1" >OUT OF STOCK : {this.props.quantity}</span>
              :
                <span class="badge  quantity-bg text-dark rounded-pill mb-2 pl-2 pr-2" >IN STOCK : {this.props.quantity}</span>  
              }
            </div>  
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.cartReducer.loading,
  getAllCartItems: state.cartReducer.getAllCartItems
});

const mapDispatchToProps = dispatch => ({
  addItemToCart: item => {
    dispatch(addItemToCart(item));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyerProduct);