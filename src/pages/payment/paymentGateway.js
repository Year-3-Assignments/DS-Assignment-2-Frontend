import React from 'react';
import { connect } from 'react-redux';
import Stripe from 'react-stripe-checkout';
import axios from 'axios';
import { setDeliveryItems } from '../../actions/deliveryActions';
import NotificationManager from '../../components/notifications/notificationCreator';
import { Link } from 'react-router-dom';
import DeliveryPage from '../delivery/delivery-page';

const $ = window.$;
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.handleToken = this.handleToken.bind(this);
    this.state = {
      isPaymentSuccess: false,
      isPaymentClicked: false,
      isDeliveryOpen: false
    }
  }

  componentDidMount() {
    console.log('items', this.props.items)
  }

  componentWillUnmount() {
    this.props.setDeliveryItems('')
  }

  async handleToken(token) {
    this.setState({ isPaymentClicked: true })
    await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/create`, {}, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        token: token.id,
        amount: this.props.amount,
        id: localStorage.getItem('id')
      }
    }).then(() => {
      this.setState({ isPaymentSuccess: true });
      $('#select-delivery').modal('show');
    })
  }

  render() {
    return (
      <div className="d-flex justify-content-center" style={{marginTop: '20px'}}>
        {this.state.isPaymentSuccess ? <NotificationManager type={'success'} message={'Payment successful'} isOpen={true} /> : null}
        {this.state.isPaymentClicked ? <NotificationManager type={'warning'} message={'Processing'} isOpen={true} /> : null}
        {this.state.isDeliveryOpen ? <Link to="/delivery/service" /> : null}
        <Stripe 
          stripeKey='pk_test_51IlJXpELrMk2voSN9qxbdvq2WSQ5vpE4iJTPWpxXc9LUn8sOnrduGZ8I9OqOepiIrV1bvjXviuKvduF1QphpoN5w00IdrPnGeu'
          token={this.handleToken}
        />
        <DeliveryPage/>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setDeliveryItems: items => {
    dispatch(setDeliveryItems(items));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);