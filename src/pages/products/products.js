import React from 'react';
import BuyerProduct from '../../components/products/buyer-products/BuyerProduct';

class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        {this.props.products && this.props.products.map((item, index) => (
          <div key={index} className="col-md-2">
            <BuyerProduct 
              productName={item.productName} 
              price={item.unitPrice} 
              productImage={item.imageUrl} 
              productId={item.id}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default Products;