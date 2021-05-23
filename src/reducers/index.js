import { combineReducers } from 'redux';
import userReducer from './userReducer';
import shopReducer from './shopReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import cartReducer from './cartReducer';

const allReducers = combineReducers({
  userReducer,
  shopReducer,
  productReducer,
  orderReducer,
  cartReducer
});

export default allReducers;
