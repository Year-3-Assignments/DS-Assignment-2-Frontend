import React from 'react';
import { setSellerShop,  } from '../../actions/shopAcions';
import { setOrder } from '../../actions/orderActions';
import { connect } from 'react-redux';
import SellerProfile from './userProfile';
import ShopCreate from '../shops/shopCreate';
import SellerShops from '../shops/sellerShops';
import Shop from '../shops/shop';
import CreateProduct from '../../components/products/seller-products/createProduct';
import BuyerOrder from '../../components/orders/buyerOrder'
import Orders from '../../components/orders/order'

const initialState = {
  isShopSelected: false,
  isOrderSelected: false
}

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  state = initialState;

  componentWillReceiveProps = (nextProps) => {
    if (this.props.sellerShop !== nextProps.setSellerShop) {
      this.setState({ 
        isShopSelected: !this.state.isShopSelected,
      });
    }

    if (this.props.orderDetail !== nextProps.setOrder) {
      this.setState({ 
        isOrderSelected: !this.state.isOrderSelected,
      });
      console.log("sELECTED")
    }

  }

  redirectToLogin() {
    window.location = "/signup";
  }
  
  render() {
    let { isShopSelected } = this.state;
    let { isOrderSelected } = this.state
    return (
      <div className="container">
        {localStorage.getItem("username") !== null ?
          <div className="row"> 
            <div className="col-md-2 col-sm-12">
              <SellerProfile/>
            </div>
            <div className="col-md-6">
              {localStorage.getItem("roles") === 'ROLE_SELLER' ?
                <div>
                  {!isShopSelected ? 
                    <div>
                      <SellerShops/>
                    </div>
                  : 
                    <div>
                      <Shop />
                    </div>
                  }
                </div> : null }
              
              {localStorage.getItem("roles") === 'ROLE_BUYER' ? 
                <div>
                {!isOrderSelected ? 
                  <div>
                    <BuyerOrder/>
                  </div>
                : 
                  <div>
                    <Orders/>
                  </div>
                }
              </div> : null }
            </div>
            <div className="col-md-4">
              {localStorage.getItem("roles") === 'ROLE_SELLER' ? 
                <div>{isShopSelected ? <CreateProduct/> : <ShopCreate/>}</div> : null}
            </div>
          </div>
        :
          this.redirectToLogin()
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sellerShop: state.shopReducer.setSellerShop,
  orderDetail: state.orderReducer.setOrder
});

const mapDispatchToProps = dispatch => ({
  setSellerShop: shop => {
    dispatch(setSellerShop(shop));
  },
  setOrder: order => {
    dispatch(setOrder(order));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);