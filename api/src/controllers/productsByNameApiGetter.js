require("dotenv").config();
const axios = require("axios");
const adaptListProducts = require("./productsByNameAdapter");
const { API_KEY } = process.env;
async function getAPIproducts(productName) {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/products/v2/list",
		params: {
			store: "US",
			offset: "0",
			categoryId: "0",
			limit: "48",
			q: `${productName}`,
		},
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": API_KEY,
		},
	};

	return axios(options)
		.then(({ data }) => adaptListProducts(data))
		.catch((e) => console.log(e.message));
}

module.exports = getAPIproducts;
