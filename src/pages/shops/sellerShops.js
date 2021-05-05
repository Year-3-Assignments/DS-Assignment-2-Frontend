import React from 'react';
import { getSellerShops, setSellerShop } from '../../actions/shopAcions';
import { connect } from 'react-redux';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import './sellerShops.css';
import _ from 'lodash';

const initialState = {
  shops: []
}

class SellerShops extends React.Component {
  constructor(props) {
    super(props);
  }

  state = initialState;

  componentDidMount() {
    this.props.getSellerShops();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getShops !== nextProps.getShops) {
      this.setState({ shops: nextProps.getShops})
    }

    if (this.props.setShop !== nextProps.setShop) {
      this.props.getSellerShops();
    }
  }

  selectSellerShop = (e, id) => {
    let shop = _.find(this.state.shops, { id: id})
    this.props.setSellerShop(shop);
  }

  render() {
    let { shops } = this.state;
    return (
      <div className="mt-3">
        {shops.length > 0 ? <h2><strong>My Shops</strong></h2> : null}

        {shops.map((shop, index) => (
          <div key={index} className="border mb-3 shop">
            <div className="p-3">
              <div className="row" onClick={e => this.selectSellerShop(e, shop.id)}>
                <div className="col-md-10">
                  <h5>{shop.shopName}</h5>
                  <h6 className="text-muted">{shop.phoneNumber}</h6>
                  <h6>Created @ {moment(shop.createdAt).format('LLLL')}</h6>
                </div>

                <div className="col-md-2 d-flex justify-content-end pr-4">
                  <button className="rounded-circle btn btn-dark btn-sm" style={{height: '34px'}}><i className="far fa-edit"></i></button>&nbsp;&nbsp;&nbsp;
                  <button className="rounded-circle btn btn-dark btn-sm" style={{height: '34px', width: '40px'}}><i className="fas fa-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getShops: state.shopReducer.getShops,
  setShop: state.shopReducer.setShop,
});

const mapDispatchToProps = dispatch => ({
  getSellerShops: () => {
    dispatch(getSellerShops());
  },
  setSellerShop: shop => {
    dispatch(setSellerShop(shop));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerShops);