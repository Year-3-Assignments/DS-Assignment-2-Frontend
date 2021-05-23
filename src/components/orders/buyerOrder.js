import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { getOrderDetails, setOrder, deleteOrderDetail } from '../../actions/orderActions';

const initialState = {
    orders: [],
    ordersId: '',
    loading: false,
    isDeleting: false
}

const $ = window.$;
class BuyerOrder extends React.Component {
    constructor(props) {
        super(props);
        this.setDeleteOrder = this.setDeleteOrder.bind(this);
    }

    state = initialState;

    componentDidMount() {
        this.props.getOrderDetails();
        this.setState({ loading: true }, () => {
            console.log('status', this.state.loading)
          });
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.getAllOrders !== nextProps.getAllOrders) {
            this.setState({ 
                orders: nextProps.getAllOrders,
                loading: nextProps.shopLoading,
                isDeleting: nextProps.isDeleting
            }, () => {
                console.log("Orders", this.state.orders);
            })
        }

        if (this.props.deleteOrder !== nextProps.deleteOrder) {       
            this.props.getOrderDetails();
        }

    }

    selectOrder = (e, id) => {
        let order = _.find(this.state.orders, { id: id});
        this.props.setOrder(order);
    }

    setDeleteOrder = (e, id) => {
        this.setState({ ordersId: id });
    }

    deleteOrder = (e) => {
        let order = {
          id: this.state.ordersId
        }
        this.setState({ isDeleting: true });
        this.props.deleteOrderDetail(order);
        $("#delete-shop").modal("toggle");
      }

    render() {
        let { orders } = this.state;
        return (
            <div>
            {!this.state.loading ?
              <div className="mt-3">
                {orders.length > 0 ? <h2><strong>My Orders</strong></h2> : null}
        
                {orders.map((order, index) => (
                  <div key={index} className="border mb-3 shop">
                    <div className="p-3">
                      <div className="row">
                        <div className="col-md-10" onClick={e => this.selectOrder(e, order.id)}>
                          <p>Order Code: {order.orderCode}</p>
                            <p>Created Date: {order.createdDate}</p>
                            <p>Status: {order.status}</p>
                        </div>
        
                        <div className="col-md-2 d-flex justify-content-end pr-4">
                          <button className="rounded-circle btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#delete-shop" onClick={e => this.setDeleteOrder(e, order.id)} style={{height: '34px', width: '40px'}}>
                        <i className="fas fa-trash"></i></button>
                        </div>
                      </div>
                      {this.state.isDeleting && this.state.ordersId === order.id ? 
                        <div class="d-flex align-items-center">
                          <strong>Deleting...</strong>
                          <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                        </div>
                      : 
                        null
                      }
                    </div>
        
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
                          <button type="submit" className="btn btn-primary btn-pill" onClick={e => this.deleteOrder(e)}>Yes</button>
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
    getAllOrders: state.orderReducer.getAllOrders,
    deleteOrder: state.orderReducer.deleteOrder,
});

const mapDispatchToProps = dispatch => ({
    getOrderDetails: () => {
        dispatch(getOrderDetails());
    },
    setOrder: order => {
        dispatch(setOrder(order));
    },
    deleteOrderDetail: order => {
        dispatch(deleteOrderDetail(order))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyerOrder);