const axios = require("axios");
const adaptListProducts = require("./productsAdapter");

async function getAPIproducts(categoryId) {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/products/v2/list",
		params: {
			store: "US",
			offset: "0",
			categoryId: `${categoryId}`,
			limit: "48",
			// q: query
		},
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "30ca8b002fmshe6d1017ee2a2098p117484jsn0cbdc93248b7",
		},
	};

	return axios(options)
		.then(({ data }) => adaptListProducts(data))
		.catch((e) => console.log(e.message));
}

module.exports = getAPIproducts;
