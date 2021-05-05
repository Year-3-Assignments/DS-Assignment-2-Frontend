import React from 'react';
import { connect } from 'react-redux';
import { getOrderDetails } from '../../actions/orderActions';

const $ = window.$;
class BuyerOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getOrderDetails();
    }

    render() {
        return (
            <div className="product-card">
                <div className="card mb-3" >
                    <div className="card-body">
                        <h5 className="card-title product-cart-title"><strong>{this.props.products}</strong></h5>
                        <p className="card-text product-cart-text p-0 m-0">Order Code : {this.props.orderCode}</p>
                        <p className="card-text product-cart-text p-0 m-0">Created Date : {this.props.createdDate}</p>
                        <p className="card-text product-cart-text p-0 m-0">Status : {this.props.status}.00</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    getUser: state.orderReducer.getAllOrders
});

const mapDispatchToProps = dispatch => ({
    getOrderDetails: () => {
        dispatch(getOrderDetails());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyerOrder);
