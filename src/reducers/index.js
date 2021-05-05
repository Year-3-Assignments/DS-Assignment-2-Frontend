import { combineReducers } from 'redux';
import userReducer from './userReducer';
import shopReducer from './shopReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';

const allReducers = combineReducers({
  userReducer,
  shopReducer,
  productReducer,
  orderReducer
});

export default allReducers;
