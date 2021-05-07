import { combineReducers } from 'redux';
import userReducer from './userReducer';
import shopReducer from './shopReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

const allReducers = combineReducers({
  userReducer,
  shopReducer,
  productReducer,
  cartReducer
});

export default allReducers;