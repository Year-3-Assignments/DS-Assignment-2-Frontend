import React from 'react';
import './BuyerProduct.css';
import _ from 'lodash';
import { connect } from 'react-redux';

class BuyerProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  setSingleProductPage = (e, id) => {
    e.preventDefault();
    window.location = `/product/${id}`;
  }

  addToCart = (e) => {
    e.preventDefault();
    
    if (!_.isEqual(localStorage.getItem("username"), null)) {
      console.log('product add to cart')
    } else {
      window.location = "/signup"
    }
  }

  render() {
    return (
      <div className="card buyer-product-card">
        <div className="product-image" style={{cursor: 'pointer'}} onClick={e => {this.setSingleProductPage(e, this.props.productId)}}> 
          <div className="card-img-actions"> 
            <img src={this.props.productImage} alt="product image" className="card-img buyer-product-img" />
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title buyer-product-cart-title mb-1">{this.props.productName}</h5>
          <p className="card-text mb-1">LKR. {this.props.price}.00</p>   
          <button className="btn btn-block btn-pill btn-dark btn-sm" onClick={this.addToCart}>
            <i class="fas fa-shopping-cart"></i>&nbsp;&nbsp;ADD TO CART
          </button>       
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BuyerProduct);