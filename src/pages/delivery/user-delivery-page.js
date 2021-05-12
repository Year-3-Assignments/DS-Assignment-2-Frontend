import React from 'react';
import { connect } from 'react-redux';
import { getCustomerDelivery } from '../../actions/deliveryActions';
import BootstrapTable from 'react-bootstrap-table-next';
import './delivery-page.css';

const columns = [
{ dataField: 'deliveryCode', text: 'Delivery Code', headerStyle: () => { return {width: '80px' }} }, 
{ dataField: 'items', text: 'Item Details', formatter: cell => cell.map((item) => (<span><img src={item.imageUrl} width="25" height="25" className="rounded-circle" /> <strong>{item.productName} | {item.itemCode}<br/></strong></span>)), headerStyle: () => { return {width: '350px' }}},
{ dataField: 'items', text: 'Quantity', formatter: cell => cell.map((item) => (<span><strong className="mb-3">{item.quantity}</strong><br/></span>)), headerStyle: () => { return {width: '50px'}}},
{ dataField: 'items', text: 'Total Price', formatter: cell => cell.map((item) => (<span>Rs.{item.totalPrice}.00<br/></span>))},
{ dataField: 'destinationAddress1', text: 'Address 1'},
{ dataField: 'destinationAddress2', text: 'Address 2'},
{ dataField: 'destinationCity', text: 'City'},
{ dataField: 'customerPhone', text: 'Phone Number'},
{ dataField: 'customerEmail', text: 'Email'},
];

class UserDeliveryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveries: [],
      isLoading: true
    }
  }

  componentDidMount() {
    if (localStorage.getItem('id') !== null && localStorage.getItem('roles') !== null) {
      let user = {
        id: localStorage.getItem('id')
      };
      this.props.getCustomerDelivery(user);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.allDeliveries !== nextProps.allDeliveries) {
      this.setState({ deliveries: nextProps.allDeliveries, isLoading: nextProps.isDeliveryLoading }, () => {
        console.log('data', this.state.deliveries, this.state.isLoading)
      })
    }
  }

  render() {
    let { deliveries } = this.state;
    return (
      <div className="container">
        <h1 className="delivery-table"><i className="fas fa-truck"></i>&nbsp;<strong>My Deliveries</strong></h1>
        {!this.state.isLoading ? 
          <div> 
            {this.state.deliveries && this.state.deliveries.length > 0 ?
              <div className="mt-4">
                <BootstrapTable keyField='id' data={ deliveries } columns={ columns } />
              </div>
            :
              <h1 className="text-muted delivery-table"><i>No Deliveries Yet</i></h1>
            }
          </div>
        :
          <div className="text-center page-loading">
            <div className="align-text-bottom">
              <div className="spinner-border" role="status" style={{width: '5rem', height: '5rem'}}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allDeliveries: state.deliveryReducer.getUserDelivery,
  isDeliveryLoading: state.deliveryReducer.loading
});

const mapDispatchToProps = dispatch => ({
  getCustomerDelivery: user => {
    dispatch(getCustomerDelivery(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDeliveryPage);