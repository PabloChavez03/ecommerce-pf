import { GET_PRODUCT_BY_NAME } from "../actions-creators";

export const getProductByName = (nameProduct) => {
    return async function (dispatch) {
        //Acá iria la constante creada donde guardamos el listado de productos que coinciden con el nombre.
        return dispatch({type: GET_PRODUCT_BY_NAME, payload: nameProduct}) //nameProduct provisoriamente hasta que tengamos creada la constante que trae los productos.
    };   
};
