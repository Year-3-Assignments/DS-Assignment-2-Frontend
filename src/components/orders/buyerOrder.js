import React from 'react';
import { connect } from 'react-redux';
import { getOrderDetails, setOrder } from '../../actions/orderActions';
import shop from '../../pages/shops/shop';
import Order from './order';

const initialState = {
    orders: []
}

const $ = window.$;
class BuyerOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    state = initialState;

    componentDidMount() {
        this.props.getOrderDetails();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.getAllOrders !== nextProps.getAllOrders) {
            this.setState({ orders: nextProps.getAllOrders }, () => {
                console.log("Orders", this.state.orders);
            })
        }

        if (this.props.deleteOrder !== nextProps.deleteOrder) {
            this.setState({ orders: nextProps.getAllOrders }, () => {
                console.log("Orders", this.state.orders);
            })          
        }

    }

    render() {
        let { orders } = this.state;
        return (
            <div style={{marginTop: 20}}>
                {orders.map((order, index) => 
                    <Order id={order.id} orderCode={order.orderCode} createdDate={order.createdDate} status={order.status}/>
                )}
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
    setOrder: orders => {
        dispatch(setOrder(orders));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyerOrder);