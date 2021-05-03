import React from 'react';
import _ from 'lodash';
import { getSellerShops } from '../../actions/shopAcions';
import { connect } from 'react-redux';
import SellerProfile from './sellerProfile';
import ShopCreate from '../shops/shopCreate';
import SellerShops from '../shops/sellerShops';

class SellerProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <SellerProfile/>
          </div>
          <div className="col-md-6">
            <ShopCreate/>
            <SellerShops/>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getShops: state.userReducer.getShops
});

const mapDispatchToProps = dispatch => ({
  getSellerShops: () => {
    dispatch(getSellerShops());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfilePage);