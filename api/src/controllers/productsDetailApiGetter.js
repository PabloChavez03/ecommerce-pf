const axios = require("axios");
const adaptProductsDetail = require("./productsDetailAdapter");

function getApiProductsDetail(productId) {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/products/v3/detail",
		params: { id: `${productId}` },
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "ef0a8b9c63msh6d897bc3dbafdf4p15c291jsn8c68fc851888",
		},
	};

	return axios
		.request(options)
		.then(({ data }) => adaptProductsDetail(data))
		.catch(function (error) {
			console.error(error.message);
		});
}

module.exports = getApiProductsDetail;
