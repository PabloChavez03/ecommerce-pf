const axios = require("axios");
const adaptProductsDetail = require("./productsDetailAdapter");

function getApiProductsDetail(productId) {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/products/v3/detail",
		params: { id: `${productId}` },
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "7ad0d3b962msh6e26138ba111494p18be12jsne10a2a98bd90",
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
