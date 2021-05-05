import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { setSellerShop, getSellerShops } from '../../actions/shopAcions';
import CreateProduct from '../../components/products/createProduct';
import SellerProduct from '../../components/products/sellerProduct';

const initialState = {
  shop: ''
}

class Shop extends React.Component {
  constructor(props) {
    super(props);
  }

  state = initialState;

  componentDidMount() {
    this.setState({ shop: this.props.shop });
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.createProduct !== nextProps.createProduct) {
      this.props.getSellerShops();
    }

    if (this.props.updateProduct !== nextProps.updateProduct) {
      this.props.getSellerShops(); 
    }

    if (this.props.deleteProduct !== nextProps.deleteProduct) {
      this.props.getSellerShops();
    }

    if (this.props.getShops !== nextProps.getShops) {
      this.setState({ shop: _.find(nextProps.getShops, {id: this.state.shop.id })})
    }
  }

  showSellerShops = (e) => {
    this.props.setSellerShop('')
  }

  render() {
    let { shop } = this.state;
    return (
      <div className="mt-4">
      <div className="d-flex justify-content-end" onClick={this.showSellerShops}>
        <button className="btn btn-light btn-pill btn-sm mb-2">
          <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;
          <span>Go Back</span>
        </button>
      </div>
        <div>
          <div>
            <h4>{shop.shopName}</h4>
            <CreateProduct/>

            <h5 className="mt-3">Shop Products</h5>
            <div className="row">
              {shop.products && shop.products.map((product, index) => (
                <div key={index} className="mt-2 col-md-4">
                  <SellerProduct 
                    id={product.id}
                    imageUrl={product.imageUrl} 
                    productName={product.productName} 
                    itemCode={product.itemCode}
                    quantity={product.quantity}
                    unitPrice={product.unitPrice}
                    createdAt={product.createdAt}
                    description={product.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  shop: state.shopReducer.setSellerShop,
  getShops: state.shopReducer.getShops,
  createProduct: state.productReducer.createProduct,
  updateProduct: state.productReducer.updateProduct,
  deleteProduct: state.productReducer.deleteProduct
});

const mapDispatchToProps = dispatch => ({
  setSellerShop: shop => {
    dispatch(setSellerShop(shop));
  },
  getSellerShops: () => {
    dispatch(getSellerShops());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);