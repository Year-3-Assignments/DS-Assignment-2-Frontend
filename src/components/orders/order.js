import React, { Component } from 'react'
import { setOrder , deleteOrderDetail } from '../../actions/orderActions';
import { connect } from 'react-redux';

const $ = window.$;
class order extends Component {
    constructor(props) {
        super(props);
    }

    setDeleteOrder = (e) => {
        let order = this.props;
        this.props.setOrder(order);
    }

    deleteProduct = (e) => {
        let order = {
          id: this.props.id
        }
        this.props.deleteOrderDetail(order);
        $("#delete_item").modal("toggle");
    }

    render() {
        return (
            <div>
            <div className="product-card">
                <div className="card mb-3" >
                <div className="img-wrapper">
                    <div className="img-overlay">
                    <button className="rounded-circle btn btn-dark btn-sm" style={{height: '34px', width: '35px', marginTop: 10}} data-bs-toggle="modal" data-bs-target="#delete_item" onClick={this.setDeleteOrder}><i className="fas fa-trash"></i></button>
                    </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text product-cart-text p-0 m-0">Order Code : {this.props.orderCode}</p>
                        <p className="card-text product-cart-text p-0 m-0">Created Date : {this.props.createdDate}</p>
                        <p className="card-text product-cart-text p-0 m-0">Status : {this.props.status}</p>
                    </div>
                </div>
            </div>
            <div className="modal fade mt-5" id="delete_item" tabIndex="-1" role="dialog" data-backdrop="static">
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
                  <button type="submit" className="btn btn-primary btn-pill" onClick={e => this.deleteProduct(e)}>Yes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    order: state.orderReducer.setProduct,
    deleteOrder: state.orderReducer.deleteOrder,
  });
  
  const mapDispatchToProps = dispatch => ({
    deleteOrderDetail: order => {
      dispatch(deleteOrderDetail(order));
    },
    setOrder: order => {
        dispatch(setOrder(order));
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(order);