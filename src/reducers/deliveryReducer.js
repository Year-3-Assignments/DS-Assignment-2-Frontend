import { GET_ALL_DELIVERY, CREATE_DELIVERY, GET_USER_DELIVERY, SET_DELIVERY_ITEMS } from '../actions/index';

const initialState = {
  getAllServices: '',
  addDelivery: '',
  getUserDelivery: '',
  setDeliveryItems: '',
  getAllServicesError: null,
  addDeliveryError: null,
  getUserDeliveryError: null,
  setDeliveryItemsError: null
};

function deliveryReducer(state = initialState, action) {
  let getAllServices, addDelivery, getUserDelivery, setDeliveryItems;

  switch (action.type) {
    case `${GET_ALL_DELIVERY}_PENDING`:
    case `${CREATE_DELIVERY}_PENDING`:
    case `${GET_USER_DELIVERY}_PENDING`:
    case `${SET_DELIVERY_ITEMS}_PENDING`:
      return { ...state, loading: true,
        getAllServicesError: null,
        addDeliveryError: null,
        getUserDeliveryError: null,
        setDeliveryItemsError: null
      };
    
    case `${GET_ALL_DELIVERY}_FULFILLED`:
      getAllServices = action.payload.data.data;
      return { ...state, loading: false, getAllServices };
    case `${CREATE_DELIVERY}_FULFILLED`:
      addDelivery = action.payload.data;
      return { ...state, loading: false, addDelivery };
    case `${GET_USER_DELIVERY}_FULFILLED`:
      getUserDelivery = action.payload.data.data;
      return { ...state, loading: false, getUserDelivery };
    case `${SET_DELIVERY_ITEMS}`:
      setDeliveryItems = action.payload;
      return { ...state, loading: false, setDeliveryItems };
    
    case `${GET_ALL_DELIVERY}_REJECTED`:
      return { ...state, loading: false, getAllServicesError: action.payload.data, state: initialState };
    case `${CREATE_DELIVERY}_REJECTED`:
      return { ...state, loading: false, addDeliveryError: action.payload.data, state: initialState };
    case `${GET_USER_DELIVERY}_REJECTED`:
      return { ...state, loading: false, getUserDeliveryError: action.payload.data, state: initialState };
    case `${SET_DELIVERY_ITEMS}_REJECTED`:
      return { ...state, loading: false, getUserDeliveryError: action.payload.data, state: initialState };
    
    default:
      return state;
  }
}

export default deliveryReducer;