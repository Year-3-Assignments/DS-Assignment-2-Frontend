import React from 'react';
import { connect } from 'react-redux';
import './cart.css';
import { incrementItemQuantity, decrementItemQuantity, removeCartItem } from '../../actions/cartActions';
import currencyFormatter from 'format-currency';

let opts = { format: '%v %c', code: '' }
class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      increment: '',
      decrement: '',
      qunatity: '',
      isLoading: false,
      isDeleting: false
    }
  }

  componentDidMount() {
    this.setState({ qunatity: this.props.qunatity });
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getAllCartItems !== nextProps.getAllCartItems) {
      this.setState({ 
        isLoading: nextProps.isCartLoading,
        isDeleting: nextProps.isProductDeleting
      });
    }
  } 

  incrementQuantity = (e, id) => {
    e.preventDefault();
    this.setState({ qunatity: this.state.qunatity + 1, isLoading: true }, () => {
      let item = {
        id: id
      };
      this.props.incrementItemQuantity(item);
    })
  }

  decrementQuantity = (e, id) => {
    e.preventDefault();
    this.setState({ qunatity: this.state.qunatity - 1, isLoading: true }, () => {
      let item = {
        id: id
      };
      this.props.decrementItemQuantity(item);
    })
  }

  removeItem = (e, id) => {
    e.preventDefault();
    this.setState({ isDeleting: true }, () => {
      let item = {
        id: id
      };
      this.props.removeCartItem(item);
    });
  }

  render() {
    return (
      <div>
        {this.props.status !== 'PURCHASED' ?
          <div className="border cart">
            <div className="">
              <div className="row">
                <div className="col-lg-2 col-sm-12">
                  <img src={this.props.image} alt="cart-product-image" className="cart-product-image" />
                </div>
                <div className="col-lg-4 col-sm-12">
                  <div className="cart-content">
                    <h5 className="mt-3"><strong>{this.props.productName}</strong></h5>
                    <h6 className="text-muted"><i class="fas fa-hashtag"></i>&nbsp;ITEM CODE : {this.props.itemCode}</h6>
                    <h6><i class="fas fa-weight"></i>&nbsp;Quantity : <strong>{this.props.qunatity}</strong></h6>
                    <h6><i class="fas fa-dollar-sign"></i>&nbsp;Unit Price: <strong>Rs. {currencyFormatter(this.props.productPrice, opts)}</strong></h6>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div>
                    <div className="d-flex justify-content-center">
                      <h5 className="mt-lg-4">Rs. {currencyFormatter(this.props.totalPrice, opts)}.00</h5>
                    </div>
                    <div className="d-flex justify-content-center">
                    <button className="btn btn-dark btn-sm" 
                      disabled={this.state.isDeleting}
                      onClick={e => this.removeItem(e, this.props.cartId)}
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  {!this.state.isLoading ? 
                    <div className="d-flex justify-content-center change-cart">
                      <button className="btn btn-dark btn-sm d-inline" 
                        style={{height: '30px', width: '30px'}}
                        onClick={e => this.decrementQuantity(e, this.props.cartId)}
                        disabled={this.state.qunatity === 1 ? true : false}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <h5 className="d-inline">&nbsp;&nbsp;&nbsp;<strong>{this.state.qunatity}</strong>&nbsp;&nbsp;&nbsp;</h5>
                      <button className="d-inline btn btn-dark btn-sm" 
                        style={{height: '30px', width: '30px'}}
                        onClick={e => this.incrementQuantity(e, this.props.cartId)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  : 
                    <div className="text-center mt-5">
                      <div className="align-text-bottom">
                        <div className="spinner-border" role="status" style={{width: '2rem', height: '2rem'}}>
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isCartLoading: state.cartReducer.loading,
  isProductDeleting: state.cartReducer.loading,
  getAllCartItems: state.cartReducer.getAllCartItems,
  incrementItemQuantity: state.cartReducer.incrementItemQuantity,
  decrementItemQuantity: state.cartReducer.decrementItemQuantity
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