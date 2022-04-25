import { GET_PRODUCT_BY_NAME } from "../actions-creators";

const initialState = {
    products: [],
    productFilter: []
};

export default function rootReducer (state = initialState, {type, payload}) {
    switch(type) {
        case GET_PRODUCT_BY_NAME:
            return {
                ...state,
                productFilter: payload
    };
        default: return {...state};
    };
};