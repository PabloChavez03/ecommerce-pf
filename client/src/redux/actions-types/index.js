import {
  GET_PRODUCT_BY_NAME,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  CHANGE_CART_QUANTITY,
  SET_CURRENT_PAGE,
  GET_ALL_PRODUCTS
} from "../actions-creators";
import axios from "axios";

export const getProductByName = (nameProduct) => {
  return async function (dispatch) {
    //Acá iria la constante creada donde guardamos el listado de productos que coinciden con el nombre.
    return dispatch({ type: GET_PRODUCT_BY_NAME, payload: nameProduct }); //nameProduct provisoriamente hasta que tengamos creada la constante que trae los productos.
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
        payload: numberPage
    };
};

export const getAllProducts = () => {
  return async function (dispatch) {
    const allProducts = await axios.get("http://localhost:3001/allproducts");
    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: allProducts.data
    });
  };
};
