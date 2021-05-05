import React from 'react';
import _ from 'lodash';
import { setSellerShop } from '../../actions/shopAcions';
import { connect } from 'react-redux';
import SellerProfile from './sellerProfile';
import ShopCreate from '../shops/shopCreate';
import SellerShops from '../shops/sellerShops';
import Shop from '../shops/shop';

const initialState = {
  isShopSelected: false
}

class SellerProfilePage extends React.Component {
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
          <div className="col-md-3 col-sm-12">
            <SellerProfile/>
          </div>
          <div className="col-md-6">
            {!isShopSelected ? 
              <div>
                <ShopCreate/>
                <SellerShops/>
              </div>
            : 
              <div>
                <Shop />
              </div>
            }
          </div>
          <div className="col-md-3">

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

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfilePage);