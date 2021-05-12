import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './singleProductPage.css';
import { getProductById } from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartActions';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import SingleShopProduct from '../../components/products/buyer-products/singleShopProduct';
import NotificationManager from '../../components/notifications/notificationCreator';

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
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      product: '',
      shopDetails: '',
      sellerDetails: '',
      shopProducts: '',
      isPageLoading: true,
      isAdding: false,
      quantity: 1
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
        shopProducts: nextProps.getProduct[1].products,
        isPageLoading: nextProps.isProductPending,
      });
    }

    if (this.props.addProductToCart !== nextProps.addItemToCart) {
      this.setState({ isAdding: nextProps.isLoading });
    }
  }

  addToCart = (e, productId) => {
    e.preventDefault();
    this.setState({ isAdding: true }, () => {
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
    });
  }

  addQunatitiy = (e) => {
    e.preventDefault();
    this.setState({ quantity: this.state.quantity + 1 });
  }

  removeQuantity = (e) => {
    e.preventDefault();
    this.setState({ quantity: this.state.quantity - 1 });
  }

  render() {
    let { product, shopDetails, sellerDetails, shopProducts } = this.state;
    return (
      <div>
        {!this.state.isPageLoading ? 
          <div className="container" style={{marginTop: '80px'}}>
            <div className="row">
              <div className="col-md-5">
                <img src={product.imageUrl} className="single-product-image" alt="product-image" />
              </div>

              <div className="col-md-7">
                <h1 className="product-title">{product.productName}</h1>
                <h4>Product Information</h4>
                <p className="product-info-text m-0"><i class="fab fa-slack-hash"></i>&nbsp;<strong>Item Code</strong>&nbsp;{product.itemCode}</p>
                <p className="product-info-text m-0"><i class="fas fa-dollar-sign"></i>&nbsp;<strong>Unit Price</strong>&nbsp;LKR {product.unitPrice}.00</p>
                <p className="product-info-text m-0"><i class="fas fa-weight"></i>&nbsp;<strong>Stock Quantity</strong>&nbsp;{product.quantity}</p>
                <p className="product-info-text m-0"><i class="fas fa-align-left"></i>&nbsp;<strong>Description</strong></p>
                <p className="product-info-text m-0 pb-3">{product.description}</p>

                <h4>Seller Details</h4>
                <div>
                  <img src={sellerDetails.imageUrl} alt="seller-profile" className="product-seller-image d-inline" />
                  &nbsp;&nbsp;
                  <h6 className="d-inline mb-1">{sellerDetails.firstName}&nbsp;{sellerDetails.lastName}</h6>
                  <p className="product-info-text mb-1"><i class="fas fa-envelope-open"></i>&nbsp;{sellerDetails.email}</p>
                  <p className="product-info-text mb-1"><i class="fas fa-map-marker-alt"></i>&nbsp;{sellerDetails.address_1}, {sellerDetails.address_2}, {sellerDetails.city}</p>
                  <p className="product-info-text mb-1"><i class="fas fa-home"></i>&nbsp;{shopDetails.shopName}</p>
                  <p className="product-info-text mb-1"><i class="fas fa-mobile"></i>&nbsp;{shopDetails.phoneNumber}</p>
                </div>

                {!this.state.isAdding ? 
                  <span>
                    {product.quantity !== 0 ?
                      <button className="btn btn-dark btn-sm btn-pill" onClick={e => this.addToCart(e, product.id)}>
                        ADD TO CART&nbsp;&nbsp;<i className="fas fa-cart-arrow-down"></i>
                      </button>
                    :
                      <button className="btn btn-dark btn-sm btn-pill" disabled>
                        OUT OF STOCK
                      </button>
                    }
                  </span>
                :
                  <button className="btn btn-dark btn-pill btn-sm" type="button" disabled>
                    <span className="spinner-border spinner-border-sm pt-0" role="status" aria-hidden="true"></span>
                    <span className="ml-2">ADDING&nbsp;&nbsp;<i className="fas fa-cart-arrow-down"></i>...</span>
                  </button>
                }
                &nbsp;&nbsp;
                <button className="btn btn-dark btn-sm btn-pill">CONTACT SELLER&nbsp;&nbsp;<i className="fas fa-phone-volume"></i></button>
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
        :
          <div class="text-center page-loading">
            <div className="align-text-bottom">
              <div class="spinner-border" role="status" style={{width: '5rem', height: '5rem'}}>
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getProduct: state.productReducer.getProduct,
  isProductPending: state.productReducer.loading,
  isLoading: state.cartReducer.loading,
  addProductToCart: state.productReducer.addProductToCart
});

const mapDispatchToProps = dispatch => ({
  getProductById: product => {
    dispatch(getProductById(product));
  },
  addItemToCart: item => {
    dispatch(addItemToCart(item));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductPage);