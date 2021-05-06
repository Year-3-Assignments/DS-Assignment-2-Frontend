import React from 'react';
import { getSellerShops, setSellerShop, setUpdateSellerShop, deleteSellerShop } from '../../actions/shopAcions';
import { connect } from 'react-redux';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import './sellerShops.css';
import _ from 'lodash';
import UpdateShop from './updateShop';

const initialState = {
  shops: [],
  shopId: '',
  loading: false
}
const $ = window.$;
class SellerShops extends React.Component {
  constructor(props) {
    super(props);
    this.setDeleteShop = this.setDeleteShop.bind(this);
  }

  state = initialState;

  componentDidMount() {
    this.props.getSellerShops();
    this.setState({ loading: true }, () => {
      console.log('status', this.state.loading)
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getShops !== nextProps.getShops) {
      this.setState({ 
        shops: nextProps.getShops,
        loading: nextProps.shopLoading
      })
    }

    if (this.props.createShop !== nextProps.createShop) {
      this.props.getSellerShops();
    }

    if (this.props.updateShop !== nextProps.updateShop) {
      this.props.getSellerShops();
    }

    if (this.props.deleteShop !== nextProps.deleteShop) {
      this.props.getSellerShops();
    }
  }

  selectSellerShop = (e, id) => {
    let shop = _.find(this.state.shops, { id: id});
    this.props.setSellerShop(shop);
  }

  setUpdateShop = (e, id) => {
    let shop = _.find(this.state.shops, { id: id});
    this.props.setUpdateSellerShop(shop); 
  }

  setDeleteShop = (e, id) => {
    this.setState({ shopId: id });
  }

  deleteShop = (e) => {
    let shop = {
      id: this.state.shopId
    }
    console.log('id', shop)
    this.props.deleteSellerShop(shop);
    $("#delete-shop").modal("toggle");
  }

  render() {
    let { shops } = this.state;
    return (
      <div>
        {!this.state.loading ?
          <div className="mt-3">
            {shops.length > 0 ? <h2><strong>My Shops</strong></h2> : null}
    
            {shops.map((shop, index) => (
              <div key={index} className="border mb-3 shop">
                <div className="p-3">
                  <div className="row">
                    <div className="col-md-10" onClick={e => this.selectSellerShop(e, shop.id)}>
                      <h5>{shop.shopName}</h5>
                      <h6 className="text-muted">{shop.phoneNumber}</h6>
                      <h6>Created @ {moment(shop.createdAt).format('LLLL')}</h6>
                    </div>
    
                    <div className="col-md-2 d-flex justify-content-end pr-4">
                      <button className="rounded-circle btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#update-shop" onClick={e => this.setUpdateShop(e, shop.id)} style={{height: '34px'}}><i className="far fa-edit"></i></button>&nbsp;&nbsp;&nbsp;
                      <button className="rounded-circle btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#delete-shop" onClick={e => this.setDeleteShop(e, shop.id)} style={{height: '34px', width: '40px'}}><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                </div>
    
                <UpdateShop />
              </div>
            ))}
    
            <div className="modal fade mt-5" id="delete-shop" tabIndex="-1" role="dialog" data-backdrop="static">
              <div className="modal-dialog modal-md" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  
                  <div className="modal-body">
                    Do you want to delete?
                  </div>
                  
                  <div className="modal-footer d-flex justify-content-center">
                    <div>
                      <button type="button" className="btn btn-light btn-pill mx-2" data-bs-dismiss="modal">No</button>
                      <button type="submit" className="btn btn-primary btn-pill" onClick={e => this.deleteShop(e)}>Yes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        : 
          <div class="text-center mt-5">
            <div class="spinner-border" role="status" style={{width: '3rem', height: '3rem'}}>
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getShops: state.shopReducer.getShops,
  createShop: state.shopReducer.createShop,
  updateShop: state.shopReducer.updateShop,
  deleteShop: state.shopReducer.deleteShop,
  shopLoading: state.shopReducer.loading
});

const mapDispatchToProps = dispatch => ({
  getSellerShops: () => {
    dispatch(getSellerShops());
  },
  setSellerShop: shop => {
    dispatch(setSellerShop(shop));
  },
  setUpdateSellerShop: shop => {
    dispatch(setUpdateSellerShop(shop));
  },
  deleteSellerShop: shop => {
    dispatch(deleteSellerShop(shop));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerShops);