import {
  ADD_PRODUCT_TO_CART,
  GET_PRODUCT_BY_NAME,
  REMOVE_PRODUCT_FROM_CART,
  CHANGE_CART_QUANTITY,
  SET_CURRENT_PAGE,
  GET_ALL_PRODUCTS,
  POST_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_CATEGORIES,
} from "../actions-creators";

const initialState = {
  products: [],
  productFilter: [],
  cartItems: [],
  currentPage: 1,
  allCategories: [], 
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

    case POST_PRODUCT:
      return {
        ...state,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        allCategories: payload,
      }
    default:
      return { ...state };
  }
}
