import { combineReducers } from 'redux';
import userReducer from './userReducer';
import shopReducer from './shopReducer';
import productReducer from './productReducer';

const allReducers = combineReducers({
  userReducer,
  shopReducer,
  productReducer
});

export default allReducers;