import React from 'react';

class SingleShopProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="product-card" style={{width: '230px'}}>
        <div className="card mb-3" >
          <div className="img-wrapper">
            <img src={this.props.imageUrl} className="card-img-top product-image" alt="product-image" />
          </div>

          <div className="card-body">
            <h5 className="card-title product-cart-title"><strong>{this.props.productName}</strong></h5>
            <p className="card-text product-cart-text p-0 m-0">Product Code : {this.props.itemCode}</p>
            <p className="card-text product-cart-text p-0 m-0">Stock Quantity : {this.props.quantity}</p>
            <p className="card-text product-cart-text p-0 m-0">Price : LKR. {this.props.unitPrice}.00</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleShopProduct;