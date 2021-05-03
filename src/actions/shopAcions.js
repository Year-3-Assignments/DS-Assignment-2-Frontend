import axios from 'axios';
import { CREATE_SHOP, GET_SELLER_SHOPS, UPDATE_SHOP, DELETE_SHOP } from './index';

export function createNewShop(shop) {
  return {
    type: CREATE_SHOP,
    payload: axios.post('http://localhost:8089/api/shop/add', shop, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}

export function getSellerShops() {
  return {
    type: GET_SELLER_SHOPS,
    payload: axios.get(`http://localhost:8089/api/shop/seller/${localStorage.getItem("id")}`, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}