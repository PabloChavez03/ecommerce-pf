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
	GET_CHAT_BOT_RECEPTOR,
	GET_CHAT_BOT_EMISOR,
	GET_USER_DATA,
	GET_PRODUCTS_NAME_ADMIN,
	CLEAN_FILTERS,
	GET_STOCK_PRODUCTS,
	LOGGED_OUT,
	UPDATE_USER_INFO,
	GET_ALL_CLIENTS,
	GET_CLIENT_DETAIL,
	DELETE_CLIENT_DETAIL,
} from "../actions-creators";
import {
	chatBot,
	currentbrands,
	currentcategory,
	getChatBotEmisor,
	getChatBotReceptor,
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

export const removeProductFromCart = (id, size) => {
	return async function (dispatch) {
		return dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: { id, size } });
	};
};

export const changeCartQuantity = (sign, id, size) => {
	return async function (dispatch) {
		return dispatch({
			type: CHANGE_CART_QUANTITY,
			payload: { sign, id, size },
		});
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

export const postProduct = (info, token) => {
	return function (dispatch) {
		const postProduct = axios
			.post("/products/create", info, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => response);
		return postProduct;
	};
};

export const updateProduct = (id, info, token) => {
	return function (dispatch) {
		const updateProduct = axios
			.patch(`/products/update/${id}`, info, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => response);
		return updateProduct;
	};
};

export const deleteProduct = (id, token) => {
	return function (dispatch) {
		return axios
			.delete(`/products/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => response);
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
			payload,
		);
	};
}

export function UserLogin(payload) {
	return async function (dispatch) {
		const userLogin = await axios.post(
			"http://localhost:3001/users/login",
			payload,
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

export const AllChatBotReceptor = () => async (dispatch) => {
	let data = await getChatBotReceptor();
	return dispatch({
		type: GET_CHAT_BOT_RECEPTOR,
		payload: data,
	});
};
export const AllChatBotEmisor = () => async (dispatch) => {
	let data = await getChatBotEmisor();
	return dispatch({
		type: GET_CHAT_BOT_EMISOR,
		payload: data,
	});
};
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
}

export function updateUserInfo(username, token, payload) {
	return async function (dispatch) {
		const { data } = await axios.patch(
			`http://localhost:3001/users/update/${username}`,
			payload,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		);

		return dispatch({
			type: UPDATE_USER_INFO,
			payload: data,
		});
	};
}

export function getAllClients(token) {
	return async function (dispatch) {
		const { data } = await axios.get("http://localhost:3001/users/findall", {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		return dispatch({
			type: GET_ALL_CLIENTS,
			payload: data,
		});
	};
}

export function getClientDetail(token, username) {
	return async function (dispatch) {
		const { data } = await axios.get(
			`http://localhost:3001/users/findByPk/${username}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		);

		return dispatch({
			type: GET_CLIENT_DETAIL,
			payload: data,
		});
	};
}

export function deleteClientDetail() {
  return {
		type: DELETE_CLIENT_DETAIL,
	}
}