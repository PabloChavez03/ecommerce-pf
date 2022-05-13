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
	RESET_ALL_CLIENTS,
	GET_CLIENT_DETAIL,
	SET_CHANGE_FORM_CREATE,
	DELETE_CHAT_BOT_RECEPTOR,
	DELETE_CHAT_BOT_EMISOR,
	GET_CHAT_BOT_RECEPTOR_NAME,
	POST_CHAT_BOT_RECEPTOR,
	POST_CHAT_BOT_EMISOR,
	PUT_CHAT_BOT_RECEPTOR,
	PUT_CHAT_BOT_EMISOR,
	CREATE_REVIEWS,
	GET_REVIEWS_USER,
	UPDATE_CLIENT_INFO,
	RESET_CLIENT_DETAIL,
	DELETE_REVIEWS,
	UPDATE_REVIEWS,
	GET_ALL_CLIENTS_ORDERS,
  GET_ALL_ORDERS,
  FILTER_ORDER_BY_STATUS,
  UPDATE_STATUS_ORDER
} from "../actions-creators";
import {
  chatBot,
  currentbrands,
  currentcategory,
  deleteChatBotEmisor,
  deleteChatBotReceptor,
  getChatBotEmisor,
  getChatBotReceptor,
  getChatBotReceptorName,
  postChatBotEmisor,
  postChatBotReceptor,
  putChatBotEmisor,
  putChatBotReceptor,
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
    const newUser = await axios.post("/users/create", payload);
    return newUser;
  };
}

export function UserLogin(payload) {
  return async function (dispatch) {
    try {
      const userLogin = await axios.post("/users/login", payload);
      return dispatch({
        type: GET_USER_DATA,
        payload: userLogin.data,
      });
    } catch (error) {
      console.log("ERROOOOOOOOOORRRRR", error.name);
      return dispatch({
        type: GET_USER_DATA,
        payload: error,
      });
    }
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
    const { data } = await axios.patch(`/users/update/${username}`, payload, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return dispatch({
      type: UPDATE_USER_INFO,
      payload: data,
    });
  };
}

export function setChangeFormCreate(form) {
  return {
    type: SET_CHANGE_FORM_CREATE,
    payload: form,
  };
}

export function getAllClients(token) {
  return async function (dispatch) {
    const { data } = await axios.get("/users/findall", {
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

export function resetAllClients() {
  return {
    type: RESET_ALL_CLIENTS,
    payload: [],
  };
}

export function getClientDetail(token, username) {
  return async function (dispatch) {
    const { data } = await axios.get(`/users/findByPk/${username}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return dispatch({
      type: GET_CLIENT_DETAIL,
      payload: data,
    });
  };
}

export const deleteIdChatBotReceptor = (id) => async (dispatch) => {
  let receptor = await deleteChatBotReceptor(id);
  let emisor = await getChatBotEmisor();
  return dispatch({
    type: DELETE_CHAT_BOT_RECEPTOR,
    payload: {
      receptor,
      emisor,
    },
  });
};

export const deleteIdChatBotEmisor = (id) => async (dispatch) => {
  let emisor = await deleteChatBotEmisor(id);
  let receptor = await getChatBotReceptor();
  return dispatch({
    type: DELETE_CHAT_BOT_EMISOR,
    payload: {
      emisor,
      receptor,
    },
  });
};

export const GetChatBotReceptorName = () => async (dispatch) => {
  let data = await getChatBotReceptorName();
  return dispatch({
    type: GET_CHAT_BOT_RECEPTOR_NAME,
    payload: data,
  });
};

export const PostChatBotReceptor = (data) => async (dispatch) => {
  await postChatBotReceptor(data);
  let receptor = await getChatBotReceptor();
  return dispatch({
    type: POST_CHAT_BOT_RECEPTOR,
    payload: receptor,
  });
};

export const PostChatBotEmisor = (data) => async (dispatch) => {
  await postChatBotEmisor(data);
  let emisor = await getChatBotEmisor();
  return dispatch({
    type: POST_CHAT_BOT_EMISOR,
    payload: emisor,
  });
};

export const PutChatBotReceptor = (data) => async (dispatch) => {
  await putChatBotReceptor(data);
  let receptor = await getChatBotReceptor();
  return dispatch({
    type: PUT_CHAT_BOT_RECEPTOR,
    payload: receptor,
  });
};

export const PutChatBotEmisor = (data) => async (dispatch) => {
  await putChatBotEmisor(data);
  let emisor = await getChatBotEmisor();
  return dispatch({
    type: PUT_CHAT_BOT_EMISOR,
    payload: emisor,
  });
};

export const createReview = (review) => {
  return async function (dispatch) {
    const postReview = await axios.post("/product/review", review);
    return dispatch({
      type: CREATE_REVIEWS,
      payload: postReview.data,
    });
  };
};

export const getReviewsUser = (user) => {
  return async function (dispatch) {
    const reviewsUser = await axios.get(`/product/review?username=${user}`);
    return dispatch({
      type: GET_REVIEWS_USER,
      payload: reviewsUser.data,
    });
  };
};

export function updateClientInfo(token, payload) {
  return async function (dispatch) {
    const { data } = await axios.patch("/client/update", payload, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return dispatch({
      type: UPDATE_CLIENT_INFO,
      payload: data,
    });
  };
}

export function resetClientDetail() {
  return {
    type: RESET_CLIENT_DETAIL,
    payload: {},
  };
}

export function deleteReview(reviewId) {
  return async function (dispatch) {
    const reviewDelete = await axios.delete("/product/review", {
      data: { reviewId },
    });
    return dispatch({
      type: DELETE_REVIEWS,
      payload: reviewDelete,
    });
  };
}

export function updateReview(update) {
  return async function (dispatch) {
    const reviewUpdate = await axios.patch("/product/review", update);
    console.log(reviewUpdate);
    return dispatch({
      type: UPDATE_REVIEWS,
      payload: reviewUpdate,
    });
  };
}

export const postOrder = (order) => {
  return async function (dispatch) {
    try {
      await axios.post("/ordendecompra", order);
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeFavorited = (user_name, payload, token) => {
  return async function (dispatch) {
    const { data } = await axios.post(`/users/wishlist/${user_name}`, payload, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return dispatch({
      type: GET_USER_DATA,
      payload: data,
    });
  };
};

export function getAllClientsOrders(/*token, */ user_name) {
  return async function (dispatch) {
    const { data } = await axios.get(
      `/findOrderByUser/${user_name}` /*, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }*/
    );

    return dispatch({
      type: GET_ALL_CLIENTS_ORDERS,
      payload: data,
    });
  };
}

export function getAllOrders(token) {
  return async function (dispatch) {
    const { data } = await axios.get("/findAllOrders", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return dispatch({
      type: GET_ALL_ORDERS,
      payload: data,
    });
  };
}

export function filterOrderByStatus( token, status) {
	return async function (dispatch) {
	  const { data } = await axios.get(`/findorderbystatus/${status}`, {
		  headers: {
			  authorization: `Bearer ${token}`,
			},
		});
	  return dispatch({
		type: FILTER_ORDER_BY_STATUS,
		payload: data,
	  });
	}
  };

export function getOrdersByPaymentId(token, payment_id) {
  return async function (dispatch) {
    const { data } = await axios.get(`/findOrderByPk/${payment_id}`/* {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }*/);

    return dispatch({
      type: GET_ALL_ORDERS,
      payload: data,
    });
  };
}

export function modifiedStatusOrder( parce, token, payment_id) {
	return async function (dispatch) {
	  const { data } = await axios.patch(`updateStatusOrder/${payment_id}`,{ status: parce } , {
		  headers: {
			  authorization: `Bearer ${token}`,
			},
		});
	}
  };
