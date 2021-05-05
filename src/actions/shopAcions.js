import axios from 'axios';
import { CREATE_SHOP, GET_SELLER_SHOPS, SET_SELLER_SHOP, UPDATE_SHOP, DELETE_SHOP, GET_SHOP } from './index';

export function createNewShop(shop) {
  return {
    type: CREATE_SHOP,
    payload: axios.post(`${process.env.REACT_APP_API_URL}/shop/add`, shop, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}

export function getSellerShops() {
  return {
    type: GET_SELLER_SHOPS,
    payload: axios.get(`${process.env.REACT_APP_API_URL}/shop/seller/${localStorage.getItem("id")}`, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}

export function updateSellerShop(shop) {
  return {
    type: UPDATE_SHOP,
    payload: axios.put(`${process.env.REACT_APP_API_URL}/shop/update`, shop, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}

export function deleteSellerShop(shop) {
  return {
    type: DELETE_SHOP,
    payload: axios.delete(`${process.env.REACT_APP_API_URL}/shop/remove/${shop.id}`, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}

export function setSellerShop(shop) {
  return {
    type: GET_SHOP,
    payload: shop
  };
}

export function setUpdateSellerShop(shop) {
  return {
    type: SET_SELLER_SHOP,
    payload: shop
  };
}