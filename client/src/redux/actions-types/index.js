import axios from "axios";
import { GET_PRODUCT_BY_NAME, ADD_PRODUCT_TO_CART } from "../actions-creators";

export const getProductByName = (nameProduct) => {
	return async function (dispatch) {
		const { data } = await axios.get(
			`http://localhost:3001/products?productName=${nameProduct}`,
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
