const axios = require("axios");
const adaptProducts = require("../adapters/products.adapter");

async function getAPIproducts(categoryId) {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/products/v2/list",
		params: {
			store: "US",
			offset: "0",
			categoryId: `${categoryId}`,
			limit: "48",
		},
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "b78c7a3b2fmsh0b41ed6110ef2c5p1eb5cfjsnb1b10669361b",
		},
	};

	return await axios(options)
		.then(({ data }) => adaptProducts(data))
		.catch((e) => e.message);
}

module.exports = getAPIproducts;
