const axios = require("axios");
const adaptListProducts = require("./productsByNameAdapter");

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
			"X-RapidAPI-Key": "e02d56678cmsh0fcf8aeb8d74e27p1a6a9cjsnd2a9695f032e",
		},
	};

   
    

	return axios(options)
		.then(({ data }) => adaptListProducts(data))
		.catch((e) => console.log(e.message));
}

module.exports = getAPIproducts;
