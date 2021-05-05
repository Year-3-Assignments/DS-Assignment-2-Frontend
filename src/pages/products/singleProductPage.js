import React from 'react';
import { connect } from 'react-redux';
import './singleProductPage.css';
import { getProductById } from '../../actions/productActions';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import SingleShopProduct from '../../components/products/singleShopProduct';

const responsive = {
  0: {
    items: 2,
  },
  450: {
    items: 4,
  },
  600: {
    items: 5,
  },
  1000: {
    items: 6,
  },
};

class SingleProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '',
      shopDetails: '',
      sellerDetails: '',
      shopProducts: ''
    }
  }

  componentDidMount() {
    let productId = this.props.match.params.id;
    this.props.getProductById(productId);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getProduct !== nextProps.getProduct) {
      this.setState({ 
        product: nextProps.getProduct[0],
        shopDetails: nextProps.getProduct[1],
        sellerDetails: nextProps.getProduct[1].user,
        shopProducts: nextProps.getProduct[1].products
      });
    }
  }

  render() {
    let { product, shopDetails, sellerDetails, shopProducts } = this.state;
    return (
      <div className="container" style={{marginTop: '80px'}}>
        <div className="row">
          <div className="col-md-5">
            <img src={product.imageUrl} className="single-product-image" alt="product-image" />
          </div>

          <div className="col-md-7">
            <h1 className="product-title">{product.productName}</h1>
            <h4>Product Information</h4>
            <p className="product-info-text m-0"><b>Item Code</b> : {product.itemCode}</p>
            <p className="product-info-text m-0"><b>Unit Price</b> : LKR {product.unitPrice}.00</p>
            <p className="product-info-text m-0"><b>Quantity</b> : {product.quantity}</p>
            <p className="product-info-text m-0"><b>Desciption</b> :</p>
            <p className="product-info-text m-0 pb-3">{product.description}</p>

            <h4>Shop Details</h4>
            <p className="product-info-text m-0"><b>Shop Name</b> : {shopDetails.shopName}</p>
            <p className="product-info-text m-0"><b>Phone</b> : {shopDetails.phoneNumber}</p>
            <p className="product-info-text m-0"><b>Seller</b> : {sellerDetails.firstName}&nbsp;{sellerDetails.lastName}</p>
            <p className="product-info-text m-0"><b>Email</b> : {sellerDetails.email}</p>
            <p className="product-info-text m-0 pb-3"><b>Address</b> : {sellerDetails.address_1}, {sellerDetails.address_2}, {sellerDetails.city}</p>
            <button className="btn btn-lg btn-warning btn-pill"><b>ADD TO CART</b>&nbsp;&nbsp;<i className="fas fa-cart-arrow-down"></i></button>&nbsp;&nbsp;
            <button className="btn btn-lg btn-success call-btn btn-pill"><b>CONTACT SELLER</b>&nbsp;&nbsp;<i className="fas fa-phone-volume"></i></button>
          </div>
        </div>

        <div className="row mt-5">
          <h4 className="mb-3">Products from <b>{shopDetails.shopName}</b></h4>
          {shopProducts.length && (
            <OwlCarousel items={6} className="owl-theme" loop nav margin={10} responsive={responsive}>
              {shopProducts.map((product) => (
                <div className="item">
                  <SingleShopProduct key={product.id} 
                    imageUrl={product.imageUrl}
                    productName={product.productName} 
                    itemCode={product.itemCode} 
                    quantity={product.quantity} 
                    unitPrice={product.unitPrice} 
                  />
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getProduct: state.productReducer.getProduct
});

const mapDispatchToProps = dispatch => ({
  getProductById: product => {
    dispatch(getProductById(product));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductPage);