import { combineReducers } from 'redux';
import userReducer from './userReducer';
import shopReducer from './shopReducer';
import productReducer from './productReducer';
import loginReducer from './loginReducers';

const allReducers = combineReducers({
  userReducer,
  shopReducer,
  productReducer,
  loginReducer
});

export default allReducers;