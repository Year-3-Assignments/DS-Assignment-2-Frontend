import axios from 'axios';
import { CREATE_USER_ACCOUNT, GET_USER_ACCOUNT, LOGIN_USER_ACCOUNT, UPDATE_USER_ACCOUNT, DELETE_USER_ACCOUNT } from './index';

export function createUserAccount(user) {
  return {
    type: CREATE_USER_ACCOUNT,
    payload: axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, user)
  };
}

export function loginUser(user) {
  return {
    type: LOGIN_USER_ACCOUNT,
    payload: axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, user)
  }
}

export function getUserAccount() {
  return {
    type: GET_USER_ACCOUNT,
    payload: axios.get(`${process.env.REACT_APP_API_URL}/api/user/${localStorage.getItem("id")}`, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}