const initialState = {
    user: null,
    cart: null
  };
  
  export const SET_USER = "SET_USER";
  export const LOGOUT_USER = "LOGOUT_USER";
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case SET_USER:
        return { 
          ...state,
          user: action.payload };
      case LOGOUT_USER:
        return {
          ...state,
          user: null
        }
      default:
        return state;
    }
  }
  
  export function setUser(user) {
    return {
      type: SET_USER,
      payload: user
    };
  }

  export function logOutUser(){
    return {
      type: LOGOUT_USER,
      payload: null
    }
  }
  