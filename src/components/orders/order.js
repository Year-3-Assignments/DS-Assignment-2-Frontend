import React, { Component } from 'react'
import { setOrder , deleteOrderDetail } from '../../actions/orderActions';
import { connect } from 'react-redux';
import _ from 'lodash';

const initialState = {
  order: ''
}

const $ = window.$;
class order extends Component {
    constructor(props) {
        super(props);
    }

    state = initialState;

    componentDidMount() {
      this.setState({ order: this.props.order });
    }

    componentWillReceiveProps = (nextProps) => {
  
      if (this.props.order !== nextProps.setOrder) {
        this.setState({ order:  _.find(nextProps.setOrder, {id: this.state.order.id })})
      }

    }


  showOrders = (e) => {
    this.props.setOrder('')
  }

    render() {
      let {order} = this.state;
        return (

          <div className="mt-4">
          <div className="d-flex justify-content-end" onClick={this.showOrders}>
            <button className="btn btn-light btn-pill btn-sm mb-2">
              <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;
              <span>Go Back</span>
            </button>
          </div>
            <div>
              <div>              
                <h5 className="mt-3">Order Details</h5>
                <div className="row">

                  <p>Order Code: {order.orderCode}</p>
                  <p>Status: {order.status}</p>
                  <p>Created Date: {order.createdDate}</p>
                  <p>Products Purchased:</p>

                  {order.products && order.products.map((product, index) => (
                    <div key={index} className="mt-2 col-md-4">
                      <p>Id: <b>{product.id}</b><br/>
                      Name: <b>{product.productName}</b><br/>
                      Item Code: <b>{product.itemCode}</b><br/>
                      Quantity: <b>{product.quantity}</b><br/>
                      Unit Price: <b>{product.unitPrice}</b></p>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
       

     )
    }
}

const mapStateToProps = state => ({
    order: state.orderReducer.setOrder,
  });
  
  const mapDispatchToProps = dispatch => ({
    setOrder: order => {
        dispatch(setOrder(order));
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(order);