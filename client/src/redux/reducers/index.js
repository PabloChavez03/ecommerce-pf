import {
	ADD_PRODUCT_TO_CART,
	GET_PRODUCT_BY_NAME,
	REMOVE_PRODUCT_FROM_CART,
	CHANGE_CART_QUANTITY,
	SET_CURRENT_PAGE,
	GET_ALL_PRODUCTS,
	GET_CURRENT_BRANDS,
	GET_FILTERS_BRANDS,
} from "../actions-creators";
import { filterbrands } from "../controllers";

const initialState = {
	allOfProducts: [],
	products: [],
	productFilter: [],
	cartItems: [],
	brands: [],
	currentPage: 1,
};

export default function rootReducer(state = initialState, { type, payload }) {
	switch (type) {
		case GET_PRODUCT_BY_NAME:
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
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: payload,
			};
		case GET_ALL_PRODUCTS:
			return {
				...state,
				products: payload,
				allOfProducts: payload
			};
		case GET_CURRENT_BRANDS:
			return {
				...state,
				brands: payload,
			}
		case GET_FILTERS_BRANDS:
			const allProducts = [...state.allOfProducts]
			if (payload === "Marca") {
				return {
					...state,
					products: allProducts
				}
			} else {
				let databrands = filterbrands(payload)
				return {
					...state,
					products: databrands,
				}
			}

		default:
			return { ...state };
	}
}
