import { CREATE_USER_ACCOUNT, GET_USER_ACCOUNT, UPDATE_USER_ACCOUNT, DELETE_USER_ACCOUNT } from '../actions/index';



const initialState = {
  setUser: '',
  getUser: '',
  updateUser: '',
  deleteUser: '',
  setUserError: null,
  getUserError: null,
  updateUserError: null,
  deleteUserError: null
}



function userReducer(state = initialState, action) {
  let setUser, getUser, updateUser, deleteUser;

  switch (action.type) {
    case `${CREATE_USER_ACCOUNT}_PENDING`:
    case `${GET_USER_ACCOUNT}_PENDING`:
    case `${UPDATE_USER_ACCOUNT}_PENDING`:
    case `${DELETE_USER_ACCOUNT}_PENDING`:
      return { ...state, loading: true,
        setUserError: null,
        getUserError: null,
        updateUserError: null,
        deleteUserError: null
      };
    
    case `${CREATE_USER_ACCOUNT}_FULFILLED`:
      setUser = action.payload.data;
      return { ...state, loading: false, setUser };
    
    case `${GET_USER_ACCOUNT}_FULFILLED`:
        getUser = action.payload.data;
        return { ...state, loading: false, getUser };

    case `${GET_USER_ACCOUNT}_REJECTED`:
      return { ...state, loading: false, setUserError: action.payload.data, state: initialState };
    case `${GET_USER_ACCOUNT}_REJECTED`:
      return { ...state, loading: false, getUserError: action.payload.data, state: initialState };

    default: 
      return state;
  }
}

export default userReducer;