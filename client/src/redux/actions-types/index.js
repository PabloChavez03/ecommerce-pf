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
  GET_FILTERS_GENDER_PRODUCT,
} from "../actions-creators";
import { currentbrands, urlProdutcGender } from "../controllers";
import axios from "axios";


export const getProductByName = (nameProduct) => {
  return async function (dispatch) {
    const { data } = await axios.get(
      `http://localhost:3001/products?productName=${nameProduct}`
    );
    //Acá iria la constante creada donde guardamos el listado de productos que coinciden con el nombre.
    return dispatch({ type: GET_PRODUCT_BY_NAME, payload: data }); //nameProduct provisoriamente hasta que tengamos creada la constante que trae los productos.
  };
};

export const addProductToCart = (product) => {
  return async function (dispatch) {
    return dispatch({ type: ADD_PRODUCT_TO_CART, payload: product });
  };
};

export const removeProductFromCart = (product) => {
  return async function (dispatch) {
    return dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: product });
  };
};
export const changeCartQuantity = (product) => {
  return async function (dispatch) {
    return dispatch({ type: CHANGE_CART_QUANTITY, payload: product });
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
    const allProducts = await axios.get("http://localhost:3001/allproducts");
    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: allProducts.data,
    });
  };
};

export function orderByPrice(payload) {
  return {
    type: ORDER_BY_PRICE,
    payload,
  };
}

export const getDetails = (productId) => {
  return async function (dispatch) {
    const productDetail = await axios.get(
      `http://localhost:3001/products/detail/${productId}`
    );
    console.log(productDetail);
    return dispatch({
      type: GET_DETAILS,
      payload: productDetail.data,
    });
  };
};

export const setDetails = () => {
  return {
    type: SET_DETAILS,
  };
};

export const getCurrentBrands = (gender) => async (dispatch) => {
  let getbrands = await currentbrands(gender)
  return dispatch({
    type: GET_CURRENT_BRANDS,
    payload: getbrands
  })
}
export const getFiltersBrands = (payload) => {

  return {
    type: GET_FILTERS_BRANDS,
    payload
  }
}

export const getFiltersGenderProduct = (payload) => async (dispatch) => {
  let dataGender = await urlProdutcGender(payload)
  return dispatch({
    type: GET_FILTERS_GENDER_PRODUCT,
    payload: dataGender,
  })
}