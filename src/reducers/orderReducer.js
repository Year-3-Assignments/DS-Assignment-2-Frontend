import { GET_ALL_ORDERS, UPDATE_ORDER, DELETE_ORDER, GET_ORDER } from '../actions/index';

const initialState = {
    getAllOrders: '',
    setOrder: '',
    updateOrder: '',
    deleteOrder: '',
    getAllOrderError: null,
    getOrderError: null,
    updateOrderError: null,
    deleteOrderError: null
}

function orderReducer(state = initialState, action) {
    let getAllOrders, updateOrder, setOrder, deleteOrder;

    switch (action.type) {
        case `${GET_ALL_ORDERS}_PENDING`:
        case `${UPDATE_ORDER}_PENDING`:
        case `${DELETE_ORDER}_PENDING`:
        case `${GET_ORDER}_PENDING`:

            return { ...state, loading: true,
                getAllOrderError: null,
                setOrderError: null,
                getOrderError: null,
                updateOrderError: null,
                deleteOrderError: null
            };

        case `${GET_ALL_ORDERS}_FULFILLED`:
            getAllOrders = action.payload.data;
            return { ...state, loading: false, getAllOrders };

        case `${UPDATE_ORDER}_FULFILLED`:
            updateOrder = action.payload.data;
            return { ...state, loading: false, updateOrder };

        case `${DELETE_ORDER}_FULFILLED`:
            deleteOrder = action.payload.data;
            return { ...state, loading: false, deleteOrder };
        
        case `${GET_ORDER}`:
            setOrder = action.payload;
            console.log(setOrder);
            return { ...state, loading: false, setOrder };
          
        case `${GET_ALL_ORDERS}_REJECTED`:
            return { ...state, loading: false, getAllProductsError: action.payload.data, state: initialState };
        case `${UPDATE_ORDER}_REJECTED`:
            return { ...state, loading: false, updateProductError: action.payload.data, state: initialState };
        case `${DELETE_ORDER}_REJECTED`:
            return { ...state, loading: false, deleteProductError: action.payload.data, state: initialState };
        case `${GET_ORDER}_REJECTED`:
            return { ...state, loading: false, setOrderError: action.payload.data, state: initialState };
    
        default:
            return state;
    }
}

export default orderReducer;
