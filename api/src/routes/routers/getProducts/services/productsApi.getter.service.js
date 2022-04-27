const axios = require("axios");
const adaptProducts = require("../adapters/products.adapter");

function getAPIproducts() {
	const options = {
		method: "get",
		url: "https://apidojo-forever21-v1.p.rapidapi.com/products/v2/list",
		params: { category: "women_main" },
		headers: {
			"X-RapidAPI-Host": "apidojo-forever21-v1.p.rapidapi.com",
			"X-RapidAPI-Key": "b78c7a3b2fmsh0b41ed6110ef2c5p1eb5cfjsnb1b10669361b",
		},
	};

	return axios(options)
		.then(({ data }) => adaptProducts(data))
		.catch((e) => console.log(e.message));
}

module.exports = getAPIproducts;
