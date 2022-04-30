import {
	ADD_PRODUCT_TO_CART,
	GET_PRODUCT_BY_NAME,
	REMOVE_PRODUCT_FROM_CART,
	CHANGE_CART_QUANTITY,
	SET_CURRENT_PAGE,
	GET_ALL_PRODUCTS,
	ORDER_BY_PRICE
} from "../actions-creators";

const initialState = {
	products: [],
	productFilter: [],
	cartItems: [],
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
			};
		case ORDER_BY_PRICE:
			let arr =
			  payload === "high"
				? state.products?.sort(function (a, b) {
					if (a.currentPrice < b.currentPrice) {
					  return 1;
					}
					if (a.currentPrice > b.currentPrice) {
					  return -1;
					} else {
					  return 0;
					}
				  })
				: state.products?.sort(function (a, b) {
					if (a.currentPrice > b.currentPrice) {
					  return 1;
					}
					if (a.currentPrice < b.currentPrice) {
					  return -1;
					} else {
					  return 0;
					}
				  });
				  console.log('me cambie')
				return {
				  ...state,
				  products: arr,
				};
		default:
			return { ...state };
	}
}
