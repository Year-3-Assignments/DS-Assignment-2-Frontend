import { combineReducers } from 'redux';
import userReducer from './userReducer';
import shopReducer from './shopReducer';

const allReducers = combineReducers({
  userReducer,
  shopReducer
});

export default allReducers;