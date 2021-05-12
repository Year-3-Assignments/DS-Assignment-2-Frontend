import React from 'react';
import { connect } from 'react-redux';
import { getAllDeliveryServices, createDelivery } from '../../actions/deliveryActions';
import Select from 'react-select';
import './delivery-page.css';

class DeliveryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      searchedValue: '',
      deliveryId: '',
      isSelected: false,
    }
  }

  componentDidMount() {
    this.props.getAllDeliveryServices();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getAllServices !== nextProps.getAllServices) {
      this.setState({ services: nextProps.getAllServices });
    }

    if (this.props.addDelivery !== nextProps.addDelivery) {
      window.location = "/me"
    }
  }

  onSelect = (selected) => {
    this.setState({ searchedValue: selected, deliveryId: selected.deliveryId }, () => {
      console.log(this.state.deliveryId)
    })
  }

  setDeliveryForm = (e) => {
    e.preventDefault();
    let deliveryItems = [];
    if (this.props.setDeliveryItems && this.props.setDeliveryItems.length > 0 && this.props.getUser) {
      this.props.setDeliveryItems.map((item, index) => {
        let deliveryItem = {
          productId: item.product.id,
          productName: item.product.productName,
          imageUrl: item.product.imageUrl,
          itemCode: item.product.itemCode,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        };
        deliveryItems.push(deliveryItem);
      })

      let delivery = {
        deliveryCode: 'SDC' + Math.random().toString(36).substr(2, 10).toUpperCase(),
        serviceId: this.state.deliveryId,
        createdDate: new Date(),
        destinationAddress1: this.props.getUser.address_1,
        destinationAddress2: this.props.getUser.address_2,
        destinationCity: this.props.getUser.city,
        customerId: this.props.getUser.id,
        customerPhone: this.props.getUser.phoneNumber,
        customerEmail: this.props.getUser.email,
        items: deliveryItems
      }
      this.props.createDelivery(delivery);
    }
  }

  render() {
    return (
      <div className="modal fade" id="select-delivery" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Select your delivery service</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="delivery-field border p-3">
                <h5>Select your delivery option</h5>
                <div className="form-row delivery-select">
                  <div className="col-md-10">
                    <Select 
                      options={this.state.services.map((item, index) => {
                        return {
                          index: index,
                          deliveryId: item._id,
                          label: <div><img src={item.avatar} width="30" height="30" className="rounded-circle" /> {item.name} | {item.email} | {item.phonenumber} | {item.city}</div>,
                          value: <div><img src={item.avatar} width="30" height="30" className="rounded-circle" /> {item.name} | {item.email} | {item.phonenumber} | {item.city}</div>
                        }
                      })}
                      isClearable={true}
                      isSearchable={false}
                      onChange={this.onSelect}
                      name="customerName"
                      value={this.state.searchedValue}
                      placeholder="Select Customer name"
                      className=""
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-pill btn-dark" onClick={this.setDeliveryForm}>SELECT</button>
                  </div>
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
  getAllServices: state.deliveryReducer.getAllServices,
  getUser: state.userReducer.getUser,
  setDeliveryItems: state.deliveryReducer.setDeliveryItems,
  addDelivery: state.deliveryReducer.addDelivery
});

const mapDispatchToProps = dispatch => ({
  getAllDeliveryServices: () => {
    dispatch(getAllDeliveryServices());
  },
  createDelivery: delivery => {
    dispatch(createDelivery(delivery));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryPage);