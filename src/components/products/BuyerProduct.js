import React from 'react';
import './BuyerProduct.css';
import { setProduct} from '../../actions/productActions';
import { connect } from 'react-redux';


class BuyerProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  getAllProducts = (e) => {
    let product = this.props;
    this.props.setProduct(product);
  }

  

  render() {
    return (
        <div className="container d-flex justify-content-center mt-50 mb-50">
        <div className="row product-card">
            <div className="col-md-18 mt-5">
                <div className="card">
                    <div className="card-img-top product-image"> 
                        <div className="card-img-actions"> <img src="" alt="Generic placeholder image"   className="card-img img-fluid" width="96" height="350"></img></div>
                        <button type="button" className="rounded-circle btn btn-warning bg-cart"style={{height: '35px', width: '35px'}}><i className="fa fa-cart-plus mr-2"></i></button>
                    </div>
                    <div className="card-body bg-light ">
                    <h5 className="card-title product-cart-title">IPhone 12 Pro</h5><br></br>
                    <h5 className="card-text product-cart-text p-0 m-0">LKR. 175,000.00</h5>          
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyerProduct);