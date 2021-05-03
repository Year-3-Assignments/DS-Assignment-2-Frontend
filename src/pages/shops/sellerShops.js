import React from 'react';
import { getSellerShops } from '../../actions/shopAcions';
import { connect } from 'react-redux';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';

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

  render() {
    let { shops } = this.state;
    return (
      <div className="mt-3">
        {shops.length > 0 ? <h2><strong>My Shops</strong></h2> : null}

        {shops.map((shop, index) => (
          <div key={index} className="border mb-3">
            <div className="p-3">
              <div className="row">
                <div className="col-md-10">
                  <h5>{shop.shopName}</h5>
                  <h6 className="text-muted">{shop.phoneNumber}</h6>
                  <h6>Created @ {moment(shop.createdAt).format('LLLL')}</h6>
                </div>

                <div className="col-md-2 d-flex justify-content-end pr-4">
                  <i class="far fa-edit"></i>&nbsp;&nbsp;&nbsp;
                  <i class="fas fa-trash"></i>
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
  setShop: state.shopReducer.setShop
});

const mapDispatchToProps = dispatch => ({
  getSellerShops: () => {
    dispatch(getSellerShops());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerShops);