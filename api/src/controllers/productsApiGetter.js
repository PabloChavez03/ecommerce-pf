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
			"X-RapidAPI-Key": "eb54dd77f1msh905b4c74d0c9228p185e3bjsn3d4a4d9f9628",
		},
	};

	return axios(options)
		.then(({ data }) => adaptListProducts(data))
		.catch((e) => console.log(e.message));
}

module.exports = getAPIproducts;
