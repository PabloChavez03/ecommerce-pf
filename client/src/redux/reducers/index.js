import { ADD_PRODUCT_TO_CART, GET_PRODUCT_BY_NAME } from "../actions-creators";

const initialState = {
	products: [],
	productFilter: [],
	cartItems: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
	switch (type) {
		case GET_PRODUCT_BY_NAME:
			console.log(payload);
			return {
				...state,
				products: payload,
				productFilter: payload,
			};

		case ADD_PRODUCT_TO_CART:
			return {
				...state,
				cartItems: [...state.cartItems, payload],
			};
		default:
			return { ...state };
	}
}
