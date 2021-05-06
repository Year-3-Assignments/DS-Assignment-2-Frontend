import React from 'react';
import './sellerProduct.css';
import { connect } from 'react-redux';
import moment from 'moment';
import { setProduct, deleteProduct } from '../../actions/productActions';
import UpdateProduct from './updateProduct';

const $ = window.$;
class SellerProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  editProduct = (e) => {
    let product = this.props;
    this.props.setProduct(product);
  }

  deleteProduct = (e) => {
    let product = {
      id: this.props.id
    }
    this.props.deleteProduct(product);
    $("#delete_item").modal("toggle");
  }

  render() {
    return (
      <div className="product-card">
        <div className="card mb-3" >
          <div className="img-wrapper">
            <img src={this.props.imageUrl} className="card-img-top product-image" alt="product-image" />
            <div className="img-overlay">
              <button className="rounded-circle btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#update-product" style={{height: '34px'}} onClick={this.editProduct}><i className="far fa-edit"></i></button>&nbsp;&nbsp;
              <button className="rounded-circle btn btn-dark btn-sm" style={{height: '34px', width: '35px'}} data-bs-toggle="modal" data-bs-target="#delete_item"><i className="fas fa-trash"></i></button>
            </div>
          </div>

          <div className="card-body">
            <h5 className="card-title product-cart-title"><strong>{this.props.productName}</strong></h5>
            <p className="card-text product-cart-text p-0 m-0">Product Code : {this.props.itemCode}</p>
            <p className="card-text product-cart-text p-0 m-0">Stock Quantity : {this.props.quantity}</p>
            <p className="card-text product-cart-text p-0 m-0">Price : LKR. {this.props.unitPrice}.00</p>
            <p className="card-text product-cart-text p-0 m-0">Publish Date : {moment(this.props.createdAt).format('L')}</p>
          </div>
        </div>
        <UpdateProduct/>

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
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setProduct: product => {
    dispatch(setProduct(product));
  },
  deleteProduct: product => {
    dispatch(deleteProduct(product));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerProduct);