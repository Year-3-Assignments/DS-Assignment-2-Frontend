import axios from 'axios';
import { CREATE_PRODUCT, GET_ALL_PRODUCTS, SET_PRODUCT, GET_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './index';

export function createNewProduct(product) {
  return {
    type: CREATE_PRODUCT,
    payload: axios.post(`${process.env.REACT_APP_API_URL}/api/product/add`, product, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}

export function getAllProducts() {
  return {
    type: GET_ALL_PRODUCTS,
    payload: axios.get(`${process.env.REACT_APP_API_URL}/api/product/`)
  };
}

export function getProductById(productId) {
  return {
    type: GET_PRODUCT,
    payload: axios.get(`${process.env.REACT_APP_API_URL}/api/product/${productId}`)
  };
}

export function updateProduct(product) {
  return {
    type: UPDATE_PRODUCT,
    payload: axios.put(`${process.env.REACT_APP_API_URL}/api/product/update`, product, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}

export function deleteProduct(product) {
  return {
    type: DELETE_PRODUCT,
    payload: axios.delete(`${process.env.REACT_APP_API_URL}/api/product/remove/${product.id}`,  {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}

export function setProduct(product) {
  return {
    type: SET_PRODUCT,
    payload: product
  };
}