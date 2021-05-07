import { ADD_ITEM_TO_CART, GET_CART_ITEMS, INCREMENT_ITEM_QUANTITY, DECREMENT_ITEM_QUANTITY, DELETE_CART_ITEM } from '../actions/index';

const initialState = {
  addProductToCart: '',
  getAllCartItems: '',
  incrementQuantity: '',
  decrementQuantity: '',
  removeItem: '',
  addProductToCartError: null,
  getAllCartItemsError: null,
  incrementQuantityError: null,
  decrementQuantityError: null,
  removeItemError: null
};

function cartReducer(state = initialState, action) {
  let addProductToCart, getAllCartItems, incrementItemQuantity, decrementItemQuantity, removeItem;

  switch (action.type) {
    case `${ADD_ITEM_TO_CART}_PENDING`:
    case `${GET_CART_ITEMS}_PENDING`:
    case `${INCREMENT_ITEM_QUANTITY}_PENDING`:
    case `${DECREMENT_ITEM_QUANTITY}_PENDING`:
    case `${DELETE_CART_ITEM}_PENDING`:
      return { ...state, loading: true, 
        addProductToCartError: null,
        getAllCartItemsError: null,
        incrementQuantityError: null,
        decrementQuantityError: null,
        removeItemError: null
      };

    case `${ADD_ITEM_TO_CART}_FULFILLED`:
      addProductToCart = action.payload.data;
      return { ...state, loading: false, addProductToCart };
    case `${GET_CART_ITEMS}_FULFILLED`:
      getAllCartItems = action.payload.data;
      return { ...state, loading: false, getAllCartItems };
    case `${INCREMENT_ITEM_QUANTITY}_FULFILLED`:
      incrementItemQuantity = action.payload.data;
      return { ...state, loading: false, incrementItemQuantity };
    case `${DECREMENT_ITEM_QUANTITY}_FULFILLED`:
      decrementItemQuantity = action.payload.data;
      return { ...state, loading: false, decrementItemQuantity };
    case `${DELETE_CART_ITEM}_FULFILLED`:
      removeItem = action.payload.data;
      return { ...state, loading: false, removeItem };

    case `${ADD_ITEM_TO_CART}_REJECTED`:
      return { ...state, loading: false, addProductToCartError: action.payload.data, state: initialState };
    case `${GET_CART_ITEMS}_REJECTED`:
      return { ...state, loading: false, getAllCartItemsError: action.payload.data, state: initialState };
    case `${INCREMENT_ITEM_QUANTITY}_REJECTED`:
      return { ...state, loading: false, incrementQuantityError: action.payload.data, state: initialState };
    case `${DECREMENT_ITEM_QUANTITY}_REJECTED`:
      return { ...state, loading: false, decrementQuantityError: action.payload.data, state: initialState };
    case `${DELETE_CART_ITEM}_REJECTED`:
      return { ...state, loading: false, removeItemError: action.payload.data, state: initialState };
    
    default:
      return state;
  }
}

export default cartReducer;