import { CREATE_SHOP, GET_SELLER_SHOPS, GET_SHOP, UPDATE_SHOP, DELETE_SHOP } from '../actions/index';

const initialState = {
  setShop: '',
  getShops: '',
  setSellerShop: '',
  updateShop: '',
  deleteShop: '',
  setShopError: null,
  getShopsError: null,
  setSellerShopError: null,
  updateShopError: null,
  deleteShopError: null
};

function shopReducer(state = initialState, action) {
  let setShop, getShops, setSellerShop, updateShop, deleteShop;

  switch (action.type) {
    case `${CREATE_SHOP}_PENDING`:
    case `${GET_SELLER_SHOPS}_PENDING`:
    case `${GET_SHOP}_PENDING`:
    case `${UPDATE_SHOP}_PENDING`:
    case `${DELETE_SHOP}_PENDING`:
      return { ...state, loading: true,
        setShopError: null,
        getShopsError: null,
        setSellerShopError: null,
        updateShopError: null,
        deleteShopError: null
      };
    
    case `${CREATE_SHOP}_FULFILLED`:
      setShop = action.payload.data;
      return { ...state, loading: false, setShop };
    
    case `${GET_SELLER_SHOPS}_FULFILLED`:
      getShops = action.payload.data;
      return { ...state, loading: false, getShops };

    case `${GET_SHOP}`:
      setSellerShop = action.payload;
      return { ...state, loading: false, setSellerShop };
    
    case `${CREATE_SHOP}_REJECTED`:
      return { ...state, loading: false, setShopError: action.payload.data, state: initialState };
    case `${GET_SELLER_SHOPS}_REJECTED`:
      return { ...state, loading: false, getShopsError: action.payload.data, state: initialState };
    case `${GET_SHOP}_REJECTED`:
      return { ...state, loading: false, setSellerShopError: action.payload.data, state: initialState };
    case `${UPDATE_SHOP}_REJECTED`:
      return { ...state, loading: false, updateShopError: action.payload.data, state: initialState };
    case `${DELETE_SHOP}_REJECTED`:
      return { ...state, loading: false, deleteShopError: action.payload.data, state: initialState };
    
    default:
      return state;
  }
}

export default shopReducer;