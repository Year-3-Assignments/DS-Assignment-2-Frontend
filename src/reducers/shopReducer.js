import { CREATE_SHOP, GET_SELLER_SHOPS, SET_SELLER_SHOP, GET_SHOP, UPDATE_SHOP, DELETE_SHOP } from '../actions/index';

const initialState = {
  createShop: '',
  getShops: '',
  setSellerShop: '',
  setUpdateShop: '',
  updateShop: '',
  deleteShop: '',
  createShopError: null,
  getShopsError: null,
  setSellerShopError: null,
  setUpdateShopError: null,
  updateShopError: null,
  deleteShopError: null
};

function shopReducer(state = initialState, action) {
  let createShop, getShops, setSellerShop, setUpdateShop, updateShop, deleteShop;

  switch (action.type) {
    case `${CREATE_SHOP}_PENDING`:
    case `${GET_SELLER_SHOPS}_PENDING`:
    case `${GET_SHOP}_PENDING`:
    case `${UPDATE_SHOP}_PENDING`:
    case `${SET_SELLER_SHOP}_PENDING`:
    case `${DELETE_SHOP}_PENDING`:
      return { ...state, loading: true,
        createShopError: null,
        getShopsError: null,
        setSellerShopError: null,
        setUpdateShopError: null,
        updateShopError: null,
        deleteShopError: null
      };
    
    case `${CREATE_SHOP}_FULFILLED`:
      createShop = action.payload.data;
      return { ...state, loading: false, createShop };
    
    case `${GET_SELLER_SHOPS}_FULFILLED`:
      getShops = action.payload.data;
      return { ...state, loading: false, getShops };

    case `${UPDATE_SHOP}_FULFILLED`:
      updateShop = action.payload.data;
      return { ...state, loading: false, updateShop };

    case `${DELETE_SHOP}_FULFILLED`:
      deleteShop = action.payload.data;
      return { ...state, loading: false, deleteShop };

    case `${GET_SHOP}`:
      setSellerShop = action.payload;
      return { ...state, loading: false, setSellerShop };
    
    case `${SET_SELLER_SHOP}`:
      setUpdateShop = action.payload;
      return { ...state, loading: false, setUpdateShop };

    case `${CREATE_SHOP}_REJECTED`:
      return { ...state, loading: false, createShopError: action.payload.data, state: initialState };
    case `${GET_SELLER_SHOPS}_REJECTED`:
      return { ...state, loading: false, getShopsError: action.payload.data, state: initialState };
    case `${GET_SHOP}_REJECTED`:
      return { ...state, loading: false, setSellerShopError: action.payload.data, state: initialState };
    case `${SET_SELLER_SHOP}_REJECTED`:
      return { ...state, loading: false, setUpdateShopError: action.payload.data, state: initialState };
    case `${UPDATE_SHOP}_REJECTED`:
      return { ...state, loading: false, updateShopError: action.payload.data, state: initialState };
    case `${DELETE_SHOP}_REJECTED`:
      return { ...state, loading: false, deleteShopError: action.payload.data, state: initialState };
    
    default:
      return state;
  }
}

export default shopReducer;