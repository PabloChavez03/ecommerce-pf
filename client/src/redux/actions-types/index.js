import {
  GET_PRODUCT_BY_NAME,
  ADD_PRODUCT_TO_CART,
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
  GET_ALL_CATEGORIES_FOR_FORM,
  CHAT_BOT,
  GET_USER_DATA,
  GET_PRODUCTS_NAME_ADMIN,
  CLEAN_FILTERS,
  GET_STOCK_PRODUCTS,
  LOGGED_OUT,
} from "../actions-creators";
import {
  chatBot,
  currentbrands,
  currentcategory,
  urlProdutcGender,
} from "../controllers";
import axios from "axios";

export const getProductByName = (nameProduct) => {
  return async function (dispatch) {
    const { data } = await axios.get(`/products?productName=${nameProduct}`);
    return dispatch({ type: GET_PRODUCT_BY_NAME, payload: data });
  };
};

export const addProductToCart = (product) => {
  return async function (dispatch) {
    return dispatch({ type: ADD_PRODUCT_TO_CART, payload: product });
  };
};

export const removeProductFromCart = (id) => {
  return async function (dispatch) {
    return dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: id });
  };
};

export const changeCartQuantity = (sign, id) => {
  return async function (dispatch) {
    return dispatch({ type: CHANGE_CART_QUANTITY, payload: [sign, id] });
  };
};

export const setCurrentPage = (numberPage) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: numberPage,
  };
};

export const getAllProducts = () => {
  return async function (dispatch) {
    const allProducts = await axios.get("/allproducts");
    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: allProducts.data,
    });
  };
};

export function orderByPrice(order, products) {
  return {
    type: ORDER_BY_PRICE,
    payload: [order, products],
  };
}

export const getDetails = (productId) => {
  return async function (dispatch) {
    const productDetail = await axios.get(`/products/detail/${productId}`);
    return dispatch({
      type: GET_DETAILS,
      payload: productDetail.data,
    });
  };
};

export const setDetails = (obj = {}) => {
  return {
    type: SET_DETAILS,
    payload: obj,
  };
};

// export const getCategories = () => {
//   return async function (dispatch) {
//     const { data } = await axios.get("http://localhost:3001/categories");
//     const titles = data?.map(el => el);
//     // console.log(titles)
//     return dispatch({
//       type: GET_CATEGORIES,
//       payload: titles,
//     })
//   }
// }

export const getCurrentBrands = (gender) => async (dispatch) => {
  let brands = await currentbrands(gender);
  return dispatch({
    type: GET_CURRENT_BRANDS,
    payload: brands,
  });
};

export const getFiltersBrands = (payload) => {
  return {
    type: GET_FILTERS_BRANDS,
    payload,
  };
};

export const postProduct = (info) => {
  return function (dispatch) {
    const postProduct = axios
      .post("/products/create", info)
      .then((response) => response);
    return postProduct;
  };
};

export const updateProduct = (id, info) => {
  return function (dispatch) {
    const updateProduct = axios
      .patch(`/products/update/${id}`, info)
      .then((response) => response);
    return updateProduct;
  };
};

export const deleteProduct = (id) => {
  return function (dispatch) {
    return axios.delete(`/products/delete/${id}`).then((response) => response);
  };
};

export const getAllCategories = (gender) => {
  return async function (dispatch) {
    const allCategories = await currentcategory(gender);
    return dispatch({
      type: GET_ALL_CATEGORIES,
      payload: allCategories,
    });
  };
};

export const getAllCategoriesForForm = () => {
  return async function (dispatch) {
    const allCategories = await axios.get("/categories");
    return dispatch({
      type: GET_ALL_CATEGORIES_FOR_FORM,
      payload: allCategories.data,
    });
  };
};

export const getCategoryById = (idCategory, sector) => {
  return async function (dispatch) {
    const category = await axios.get(`/products?categoryId=${idCategory}`);
    return dispatch({
      type: GET_CATEGORY_BY_ID,
      payload: {
        category: category.data,
        sector,
      },
    });
  };
};

export const getFiltersGenderProduct = (payload) => async (dispatch) => {
  let dataGender = await urlProdutcGender(payload);
  return dispatch({
    type: GET_FILTERS_GENDER_PRODUCT,
    payload: dataGender,
  });
};

export function createNewUser(payload) {
  return async function (dispatch) {
    const newUser = await axios.post(
      "http://localhost:3001/users/create",
      payload
    );
  };
}

export function UserLogin(payload) {
  return async function (dispatch) {
    const userLogin = await axios.post(
      "http://localhost:3001/users/login",
      payload
    );
    return dispatch({
      type: GET_USER_DATA,
      payload: userLogin.data,
    });
  };
}

export const getChatBot = (payload) => async (dispatch) => {
  let data = await chatBot(payload);

  return dispatch({
    type: CHAT_BOT,
    payload: data,
  });
};
// export function filterBrandAdmin(payload){
// 	return {
// 		type: FILTER_BRAND_ADMIN,
// 		payload
// 	};
// };

export function getProductByNameAdmin(name) {
  return async function (dispatch) {
    const { data } = await axios.get(`/products?productName=${name}`);
    return dispatch({ type: GET_PRODUCTS_NAME_ADMIN, payload: data });
  };
}

export function cleanFilters(sector) {
  return {
    type: CLEAN_FILTERS,
    payload: sector,
  };
}

export function getStockProductRender(payload) {
  return {
    type: GET_STOCK_PRODUCTS,
    payload,
  };
}

export function loggedOut() {
  return {
    type: LOGGED_OUT,
  };
};