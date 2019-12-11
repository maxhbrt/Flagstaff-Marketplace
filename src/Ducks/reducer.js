import axios from 'axios';

const initialState = {
    user: null,
    cart: [],
    quantity: []
  };
  export const GET_QUANTITY = "GET_QUANTITY";
  export const ADD_TO_CART = 'ADD_TO_CART';
  export const GET_CART = 'GET_CART';
  export const SET_USER = "SET_USER";
  export const LOGOUT_USER = "LOGOUT_USER";
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case GET_CART + '_PENDING':
        return {
          ...state,
          loading: true
        }
      case GET_CART + '_FULFILLED':
        return{
          ...state,
          data: action.payload,
          loading: false
        }
        case GET_CART + '_REJECTED':
          return{
            ...state,
            loading:false
          }
        case ADD_TO_CART + '_PENDING':
          return{
            ...state,
            loading: true
          }
        case ADD_TO_CART + '_FULFILLED':
          return{
            ...state,
            loading: false
          }
        case ADD_TO_CART + '_REJECTED':
          return{
            ...state,
            loading: false
          }

      case SET_USER:
        return { 
          ...state,
          user: action.payload };
      case LOGOUT_USER:
        return {
          ...state,
          user: null
        }
          case GET_QUANTITY:
            return{
              ...state,
                quantity: action.payload.data
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

  export function getCart(arr){
    return{
      type: GET_CART,
      payload: arr
    }
  }

  export function addToCart(arr){
    return{
      type: ADD_TO_CART,
      payload: arr
    }
  }
  export function getQuantity(){
    return{
      type: GET_QUANTITY,
      payload:  axios.get(`/api/getcart`)
    }
 

  }
  