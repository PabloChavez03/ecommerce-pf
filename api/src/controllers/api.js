const axios = require("axios");

const options = {
	method: "GET",
	url: "https://apidojo-forever21-v1.p.rapidapi.com/categories/v2/list",
	headers: {
		"X-RapidAPI-Host": "apidojo-forever21-v1.p.rapidapi.com",
		"X-RapidAPI-Key": "324a0d5d1emshad70a2c958f1e4cp140a43jsn270daa51ceb2",
	},
};
/** Haciendo una peticion usando limit */

const getInfoApi = () => {
	return axios
		.request(options)
		.then((response) => response.data.menuItemList[0].ChildMenus)
		.catch((error) => console.log(error));
};

const getAllCategoriesMain = async () => {
	const listCategories = await getInfoApi();
	const allCategories = listCategories.map((element) => element.Category); //
	return allCategories;
};

module.exports = {
	getAllCategoriesMain,
};
