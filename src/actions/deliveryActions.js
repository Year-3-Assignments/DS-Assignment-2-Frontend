import axios from 'axios';
import { GET_ALL_DELIVERY, CREATE_DELIVERY, GET_USER_DELIVERY, SET_DELIVERY_ITEMS } from './index';

export function getAllDeliveryServices() {
  return {
    type: GET_ALL_DELIVERY,
    payload: axios.get(`${process.env.REACT_APP_DELIVERY_API_URL}/service/get`)
  };
}

export function setDeliveryItems(items) {
  return {
    type: SET_DELIVERY_ITEMS,
    payload: items
  };
}

export function createDelivery(delivery) {
  return {
    type: CREATE_DELIVERY,
    payload: axios.post(`${process.env.REACT_APP_DELIVERY_API_URL}/delivery/create`, delivery)
  };
}

export function getCustomerDelivery(user) {
  return {
    type: GET_USER_DELIVERY,
    payload: axios.get(`${process.env.REACT_APP_DELIVERY_API_URL}/delivery/get/${user.id}`)
  };
}