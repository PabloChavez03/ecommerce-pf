import {
  ADD_PRODUCT_TO_CART,
  GET_PRODUCT_BY_NAME,
  REMOVE_PRODUCT_FROM_CART,
  CHANGE_CART_QUANTITY,
  SET_CURRENT_PAGE,
  GET_ALL_PRODUCTS,
  GET_CURRENT_BRANDS,
  GET_FILTERS_BRANDS,
  ORDER_BY_PRICE,
  GET_DETAILS,
  SET_DETAILS,

} from "../actions-creators";
import { filterbrands } from "../controllers";

const initialState = {

  allOfProducts: [],
  products: [],
  productFilter: [],
  cartItems: [],
  brands: [],
  currentPage: 1,
  details: {},
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
    case GET_DETAILS:
      return {
        ...state,
        details: payload,
      };
    case SET_DETAILS:
      return {
        ...state,
        details: {},
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
      return {
        ...state,
        products: arr,
      };
    default:
      return { ...state };
  }
}
