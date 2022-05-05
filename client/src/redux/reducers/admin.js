import { GET_ALL_PRODUCTS } from "../actions-creators/adminActionsCreators";

const stateAdmin = {
    allProducts: [],
    productsCurrent: [],
    detailProduct: {},
    page: 1,
    order: ""
};

export default function adminReducer(state = stateAdmin, { type, payload }) {
    switch(type) {
        case GET_ALL_PRODUCTS:
            return{
                ...state,
                allProducts: payload
            };
        default: return {...state}
    };
};