import axios from 'axios';
import { CREATE_USER_ACCOUNT, GET_USER_ACCOUNT, UPDATE_USER_ACCOUNT, DELETE_USER_ACCOUNT } from './index';

export function createUserAccount(user) {
  return {
    type: CREATE_USER_ACCOUNT,
    payload: axios.post('http://localhost:8089/api/auth/signup', user)
  };
}

export function getUserAccount() {
  return {
    type: GET_USER_ACCOUNT,
    payload: axios.get(`http://localhost:8089/api/user/${localStorage.getItem("id")}`, {
      headers: {
        "Authorization": localStorage.getItem("Authorization")
      }
    })
  };
}