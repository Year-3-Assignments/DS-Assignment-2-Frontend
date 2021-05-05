import { CREATE_PRODUCT, GET_ALL_PRODUCTS, GET_PRODUCT, SET_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/index';

const initialState = {
  createProduct: '',
  getAllProducts: '',
  getProduct: '',
  setProduct: '',
  updateProduct: '',
  deleteProduct: '',
  createProductError: null,
  getAllProductsError: null,
  getProductError: null,
  setProductError: null,
  updateProductError: null,
  deleteProductError: null
}

function productReducer(state = initialState, action) {
  let createProduct, getAllProducts, getProduct, setProduct, updateProduct, deleteProduct;

  switch (action.type) {
    case `${CREATE_PRODUCT}_PENDING`:
    case `${GET_ALL_PRODUCTS}_PENDING`:
    case `${GET_PRODUCT}_PENDING`:
    case `${SET_PRODUCT}_PENDING`:
    case `${UPDATE_PRODUCT}_PENDING`:
    case `${DELETE_PRODUCT}_PENDING`:
      return { ...state, loading: true, 
        createProductError: null,
        getAllProductsError: null,
        getProductError: null,
        setProductError: null,
        updateProductError: null,
        deleteProductError: null
      };
    
    case `${CREATE_PRODUCT}_FULFILLED`:
      createProduct = action.payload.data;
      return { ...state, loading: false, createProduct };

    case `${GET_ALL_PRODUCTS}_FULFILLED`:
      getAllProducts = action.payload.data;
      return { ...state, loading: false, getAllProducts };

    case `${SET_PRODUCT}`:
      setProduct = action.payload;
      return { ...state, loading: false, setProduct };
    
    case `${UPDATE_PRODUCT}_FULFILLED`:
      updateProduct = action.payload.data;
      return { ...state, loading: false, updateProduct };

    case `${DELETE_PRODUCT}_FULFILLED`:
      deleteProduct = action.payload.data;
      return { ...state, loading: false, deleteProduct };

    case `${CREATE_PRODUCT}_REJECTED`:
      return { ...state, loading: false, createProductError: action.payload.data, state: initialState };
    case `${GET_ALL_PRODUCTS}_REJECTED`:
      return { ...state, loading: false, getAllProductsError: action.payload.data, state: initialState };
    case `${GET_PRODUCT}_REJECTED`:
      return { ...state, loading: false, getProductError: action.payload.data, state: initialState };
    case `${SET_PRODUCT}_REJECTED`:
      return { ...state, loading: false, setProductError: action.payload.data, state: initialState };
    case `${UPDATE_PRODUCT}_REJECTED`:
      return { ...state, loading: false, updateProductError: action.payload.data, state: initialState };
    case `${DELETE_PRODUCT}_REJECTED`:
      return { ...state, loading: false, deleteProductError: action.payload.data, state: initialState };
    
    default:
      return state;
  }
}

export default productReducer;