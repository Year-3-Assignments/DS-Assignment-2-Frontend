import React from 'react';
import _ from 'lodash';
import { setSellerShop } from '../../actions/shopAcions';
import { connect } from 'react-redux';
import SellerProfile from './userProfile';
import ShopCreate from '../shops/shopCreate';
import SellerShops from '../shops/sellerShops';
import Shop from '../shops/shop';
import CreateProduct from '../../components/products/createProduct';
import BuyerOrder from '../../components/orders/buyerOrder';

const initialState = {
  isShopSelected: false
}

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  state = initialState;

  componentWillReceiveProps = (nextProps) => {
    if (this.props.sellerShop !== nextProps.setSellerShop) {
      this.setState({ isShopSelected: !this.state.isShopSelected });
    }
  }
  
  render() {
    let { isShopSelected } = this.state;
    return (
      <div className="container">
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
              <div><BuyerOrder/></div> : null}
          </div>
          <div className="col-md-4">
            {localStorage.getItem("roles") === 'ROLE_SELLER' ? 
              <div>{isShopSelected ? <CreateProduct/> : <ShopCreate/>}</div> : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sellerShop: state.shopReducer.setSellerShop
});

const mapDispatchToProps = dispatch => ({
  setSellerShop: shop => {
    dispatch(setSellerShop(shop));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
