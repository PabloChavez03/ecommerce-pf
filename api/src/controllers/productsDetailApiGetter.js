const axios = require("axios");
const adaptProductsDetail = require("./productsDetailAdapter");

function getApiProductsDetail(productId) {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/products/v3/detail",
		params: { id: `${productId}` },
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "b4419db468mshc852c1556d25a25p17fe32jsndbc31541a7c3",
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
