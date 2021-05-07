import axios from 'axios';
import { ADD_ITEM_TO_CART, GET_CART_ITEMS, INCREMENT_ITEM_QUANTITY, DECREMENT_ITEM_QUANTITY, DELETE_CART_ITEM } from './index';

export function addItemToCart(item) {
  return {
    type: ADD_ITEM_TO_CART,
    payload: axios.post(`${process.env.REACT_APP_API_URL}/api/cart/add`, item, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}

export function getCartItems(user) {
  return {
    type: GET_CART_ITEMS,
    payload: axios.get(`${process.env.REACT_APP_API_URL}/api/cart/${user.id}`, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  }
}

export function incrementItemQuantity(item) {
  return {
    type: INCREMENT_ITEM_QUANTITY,
    payload: axios.put(`${process.env.REACT_APP_API_URL}/api/cart/change/add/${item.id}`, null, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}

export function decrementItemQuantity(item) {
  return {
    type: DECREMENT_ITEM_QUANTITY,
    payload: axios.put(`${process.env.REACT_APP_API_URL}/api/cart/change/add/${item.id}`, null, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}

export function removeCartItem(item) {
  return {
    type: DELETE_CART_ITEM,
    payload: axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/change/delete/${item.id}`, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  }
}