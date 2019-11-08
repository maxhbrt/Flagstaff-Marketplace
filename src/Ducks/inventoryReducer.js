const initialState = {
    inventory: {},
    cart: null,
    cartTotal: null
}

export const GET_INVENTORY = "GET_INVENTORY";
export const GET_CART = "GET_CART";
export const CART_TOTAL = "CART_TOTAL";

const inventoryReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case GET_INVENTORY:
            return{
                ...state,
                inventory: payload
            };
            case GET_CART:
                return{
                    ...state,
                    cart: payload
                };
            case CART_TOTAL:
                return {
                    ...state,
                    cartTotal: payload
                };
                default:
                    return state;
    }
};

export default inventoryReducer;