import {
	ADD_PRODUCT_TO_CART,
	GET_PRODUCT_BY_NAME,
	REMOVE_PRODUCT_FROM_CART,
	CHANGE_CART_QUANTITY,
} from "../actions-creators";

const initialState = {
	products: [],
	productFilter: [],
	cartItems: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
	switch (type) {
		case GET_PRODUCT_BY_NAME:
			return {
				...state,
				productFilter: payload,
			};
		case ADD_PRODUCT_TO_CART:
			return {
				...state,
				cartItems: [...state.cartItems, payload],
			};
		case REMOVE_PRODUCT_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter((e) => e.id !== payload.id),
			};
		case CHANGE_CART_QUANTITY:
			return {
				...state,
				cartItems: state.cartItems.filter((e) =>
					e.id !== payload.id ? (e.quantity = payload.quantity) : e.quantity
				),
			};
		default:
			return { ...state };
	}
}
