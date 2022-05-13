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
  GET_CHAT_BOT_RECEPTOR,
  GET_CHAT_BOT_EMISOR,
  GET_USER_DATA,
  GET_PRODUCTS_NAME_ADMIN,
  CLEAN_FILTERS,
  GET_STOCK_PRODUCTS,
  LOGGED_OUT,
  UPDATE_USER_INFO,
  DELETE_CHAT_BOT_RECEPTOR,
  DELETE_CHAT_BOT_EMISOR,
  GET_CHAT_BOT_RECEPTOR_NAME,
  POST_CHAT_BOT_RECEPTOR,
  POST_CHAT_BOT_EMISOR,
  PUT_CHAT_BOT_RECEPTOR,
  PUT_CHAT_BOT_EMISOR,
  SET_CHANGE_FORM_CREATE,
  GET_ALL_CLIENTS,
  GET_CLIENT_DETAIL,
  RESET_ALL_CLIENTS,
  RESET_CLIENT_DETAIL,
  UPDATE_CLIENT_INFO,
  CREATE_REVIEWS,
  GET_REVIEWS_USER,
  DELETE_REVIEWS,
  UPDATE_REVIEWS,
  GET_ALL_CLIENTS_ORDERS,
  GET_ALL_ORDERS,
  GET_ORDERS_BY_PAYMENT_ID,
} from "../actions-creators";
import { filterbrands } from "../controllers";

export const initialState = {
  products: [],
  productFilter: [],
  cartItems: [],
  brands: [],
  currentPage: 1,
  details: {},
  categories: [],
  newgenders: [],
  subTotal: 0,
  categoriesForForm: [],
  chatbot: {},
  chatBotReceptor: [],
  chatBotEmisor: [],
  userData: {},
  productFilterAdmin: [],
  productsAdmin: [],
  chatBotReceptorName: [],
  productCreate: {
    name: "",
    description: "",
    images: [],
    previousPrice: "",
    isOffertPrice: false,
    currentPrice: "",
    color: "",
    gender: "",
    brandName: "",
    category: "",
    info: {
      aboutMe: "",
      sizeAndFit: "",
      careInfo: "",
    },
    variants: [],
  },
  allClients: [],
  clientDetail: {},
  reviewsUser: [],
  allOrdersClientes: [],
  allOrders: [],
  orderByPaymentId: {},
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        productFilter: payload,
      };
    case ADD_PRODUCT_TO_CART:
      let cartProductAux = state.cartItems.find(
        (e) => e.id + e.brandSize === payload.id + payload.brandSize
      );
      if (cartProductAux) {
        const prevCart = state.cartItems.filter(
          (e) => e.id + e.brandSize !== payload.id + payload.brandSize
        );
        if (payload.variants[0].stock !== cartProductAux.quantity) {
          cartProductAux.quantity++;
        } else {
          alert("No hay mas stock de este producto");
        }
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
      let indexRemoveQty = state.cartItems.findIndex(
        (e) =>
          e.id + e.brandSize.toString() === payload.id + payload.size.toString()
      );
      state.cartItems[indexRemoveQty].quantity = 1;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (e) =>
            e.id + e.brandSize.toString() !==
            payload.id + payload.size.toString()
        ),
      };
    case CHANGE_CART_QUANTITY:
      let index = state.cartItems.findIndex(
        (e) =>
          e.id + e.brandSize.toString() === payload.id + payload.size.toString()
      );
      let item = state.cartItems[index];
      if (payload.sign === "-") {
        if (item.quantity === 1) {
          return {
            ...state,
            cartItems: state.cartItems.filter(
              (e) =>
                e.id + e.brandSize.toString() !==
                payload.id + payload.size.toString()
            ),
          };
        }
        state.cartItems[index].quantity--;
      } else {
        console.log("variants", item.variants);
        let variantIndex = item.variants.findIndex(
          (e) => e.brandSize.toString() === payload.size.toString()
        );
        if (item.variants[variantIndex].stock !== item.quantity) {
          item.quantity++;
        } else {
          alert("No hay mas stock de este producto");
        }
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
        productsAdmin: payload,
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
          currentPage: 1,
        };
      } else {
        let dataBrands = filterbrands(payload, allProducts);
        return {
          ...state,
          productFilter: dataBrands,
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
        reviewsUser: [],
      };
    case ORDER_BY_PRICE:
      let productsSort = payload[1];
      let arr =
        payload[0] === "high"
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
      return {
        ...state,
        productFilter: arr,
        currentPage: 1,
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case GET_CATEGORY_BY_ID:
      if (payload.sector === "admin") {
        return {
          ...state,
          productFilterAdmin: payload.category,
          currentPage: 1,
        };
      } else {
        return {
          ...state,
          productFilter: payload.category,
          currentPage: 1,
        };
      }
    case GET_FILTERS_GENDER_PRODUCT:
      return {
        ...state,
        products: payload,
        newgenders: payload,
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
    case GET_PRODUCTS_NAME_ADMIN:
      return {
        ...state,
        productFilterAdmin: payload,
      };
    case CLEAN_FILTERS:
      if (payload === "home") {
        return {
          ...state,
          productFilter: [],
        };
      } else {
        return {
          ...state,
          productFilterAdmin: [],
        };
      }
    case GET_CHAT_BOT_RECEPTOR:
      return {
        ...state,
        chatBotReceptor: payload,
      };
    case GET_CHAT_BOT_EMISOR:
      return {
        ...state,
        chatBotEmisor: payload,
      };
    case GET_STOCK_PRODUCTS:
      return {
        ...state,
        productFilterAdmin: state.productsAdmin.filter(
          (e) => e.isInStock === true
        ),
      };
    case LOGGED_OUT:
      return {
        ...state,
        productFilter: [],
        productFilterAdmin: [],
        currentPage: 1,
        userData: {},
        cartItems: [],
        details: {},
        productCreate: {
          name: "",
          description: "",
          images: [],
          previousPrice: null,
          isOffertPrice: false,
          currentPrice: "",
          color: "",
          gender: "",
          brandName: "",
          category: "",
          info: {
            aboutMe: "",
            sizeAndFit: "",
            careInfo: "",
          },
          variants: [],
        },
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        userData: payload,
      };
    case DELETE_CHAT_BOT_RECEPTOR:
      return {
        ...state,
        chatBotReceptor: payload.receptor,
        chatBotEmisor: payload.emisor,
      };
    case DELETE_CHAT_BOT_EMISOR:
      return {
        ...state,
        chatBotReceptor: payload.receptor,
        chatBotEmisor: payload.emisor,
      };
    case GET_CHAT_BOT_RECEPTOR_NAME:
      return {
        ...state,
        chatBotReceptorName: payload,
      };
    case POST_CHAT_BOT_RECEPTOR:
      return {
        ...state,
        chatBotReceptor: payload,
      };
    case POST_CHAT_BOT_EMISOR:
      return {
        ...state,
        chatBotEmisor: payload,
      };
    case PUT_CHAT_BOT_RECEPTOR:
      return {
        ...state,
        chatBotReceptor: payload,
      };
    case PUT_CHAT_BOT_EMISOR:
      return {
        ...state,
        chatBotEmisor: payload,
      };
    case SET_CHANGE_FORM_CREATE:
      return {
        ...state,
        productCreate: payload,
      };
    case GET_ALL_CLIENTS:
      return {
        ...state,
        allClients: payload,
      };

    case RESET_ALL_CLIENTS:
      return {
        ...state,
        allClients: payload,
      };

    case GET_CLIENT_DETAIL:
      return {
        ...state,
        clientDetail: payload,
      };

    case RESET_CLIENT_DETAIL:
      return {
        ...state,
        clientDetail: payload,
      };

    case UPDATE_CLIENT_INFO:
      return {
        ...state,
        clientDetail: payload,
      };
    case CREATE_REVIEWS:
      return {
        ...state,
      };
    case GET_REVIEWS_USER:
      console.log(payload);
      return {
        ...state,
        reviewsUser: payload,
      };
    case DELETE_REVIEWS:
      return {
        ...state,
      };
    case UPDATE_REVIEWS:
      return {
        ...state,
      };
    case GET_ALL_CLIENTS_ORDERS:
      return {
        ...state,
        allOrdersClientes: payload,
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: payload,
      };
    case GET_ORDERS_BY_PAYMENT_ID:
      return {
        ...state,
        orderByPaymentId: payload,
      };
    default:
      return { ...state };
  }
}
