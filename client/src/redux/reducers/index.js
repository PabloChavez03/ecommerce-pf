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
  GET_ALL_CATEGORIES,
  GET_CATEGORY_BY_ID,
  GET_FILTERS_GENDER_PRODUCT,
  POST_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_CATEGORIES_FOR_FORM,
  CHAT_BOT,
  GET_USER_DATA,
} from "../actions-creators";
import { filterbrands } from "../controllers";

const initialState = {
  products: [],
  productFilter: [],
  cartItems: [],
  brands: [],
  currentPage: 1,
  details: {},
  categories: [],
  select: "",
  newgenders: [],
  subTotal: 0,
  categoriesForForm: [],
  chatbot: {},
  userData: {},
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PRODUCT_BY_NAME:
      let gender = state.products.find((e) => e.Category.genre).Category.genre;
      return {
        ...state,
        productFilter: payload.filter((e) => e.Category.genre === gender),
        select: "name",
      };
    case ADD_PRODUCT_TO_CART:
      let cartProductAux = state.cartItems.find((e) => e.id === payload.id);
      if (cartProductAux) {
        const prevCart = state.cartItems.filter((e) => e.id !== payload.id);
        cartProductAux.quantity++;
        return {
          ...state,
          cartItems: [...prevCart, cartProductAux],
          subTotal: Number(
            state.subTotal +
              Math.round(cartProductAux.currentPrice * cartProductAux.quantity)
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
          subTotal: Number(
            state.subTotal + Math.round(payload.currentPrice * payload.quantity)
          ),
        };
      }
    case REMOVE_PRODUCT_FROM_CART:
      let indexRemoveQty = state.cartItems.findIndex((e) => e.id === payload);
      // let itemRemoveQty = state.cartItems[index];
      state.cartItems[indexRemoveQty].quantity = 1;
      return {
        ...state,
        cartItems: state.cartItems.filter((e) => e.id !== payload),
      };
    case CHANGE_CART_QUANTITY:
      let index = state.cartItems.findIndex((e) => e.id === payload[1]);
      let item = state.cartItems[index];
      if (payload[0] === "-") {
        if (item.quantity === 1) {
          return {
            ...state,
            cartItems: state.cartItems.filter((e) => e.id !== payload[1]),
          };
        }
        state.cartItems[index].quantity--;
      } else {
        state.cartItems[index].quantity++;
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
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
    case GET_CURRENT_BRANDS:
      return {
        ...state,
        brands: payload,
      };
    case GET_FILTERS_BRANDS:
      const allProducts = [...state.newgenders];
      if (payload === "Marca") {
        return {
          ...state,
          productFilter: allProducts,
          select: payload,
          currentPage: 1,
        };
      } else {
        let dataBrands = filterbrands(payload, allProducts);
        return {
          ...state,
          productFilter: dataBrands,
          select: payload,
          currentPage: 1,
        };
      }
    case GET_DETAILS:
      return {
        ...state,
        details: payload,
      };
    case SET_DETAILS:
      return {
        ...state,
        details: payload,
      };
    case ORDER_BY_PRICE:
      let productsSort =
        state.select === "" ? state.products : state.productFilter;
      let arr =
        payload === "high"
          ? productsSort?.sort(function (a, b) {
              if (a.currentPrice < b.currentPrice) {
                return 1;
              }
              if (a.currentPrice > b.currentPrice) {
                return -1;
              } else {
                return 0;
              }
            })
          : productsSort?.sort(function (a, b) {
              if (a.currentPrice > b.currentPrice) {
                return 1;
              }
              if (a.currentPrice < b.currentPrice) {
                return -1;
              } else {
                return 0;
              }
            });
      if (state.select === "") {
        return {
          ...state,
          products: arr,
          currentPage: 1,
        };
      } else {
        return {
          ...state,
          productFilter: arr,
          currentPage: 1,
        };
      }
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case GET_CATEGORY_BY_ID:
      return {
        ...state,
        productFilter: payload[0],
        select: payload[1],
        currentPage: 1,
      };
    case GET_FILTERS_GENDER_PRODUCT:
      return {
        ...state,
        products: payload,
        newgenders: payload,
        select: "",
        currentPage: 1,
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
    case GET_ALL_CATEGORIES_FOR_FORM:
      return {
        ...state,
        categoriesForForm: payload,
      };
    case CHAT_BOT:
      return {
        ...state,
        chatbot: payload,
      };
    case GET_USER_DATA:
      return {
        ...state,
        userData: payload,
      };
    default:
      return { ...state };
  }
}
