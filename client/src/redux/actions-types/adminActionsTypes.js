import axios from "axios";
import { GET_ALL_PRODUCTS } from "../actions-creators/adminActionsCreators";

export const getAllProducts = () => {
    return async function (dispatch) {
      const allProducts = await axios.get("/allproducts");
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: allProducts.data,
      });
    };
  };