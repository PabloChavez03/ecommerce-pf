const axios = require("axios");
const adaptProductsDetail = require("./productsDetailAdapter");

function getApiProductsDetail(productId) {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/products/v3/detail",
		params: { id: `${productId}` },
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "cfb63a99ecmsh41dc7462f7a680bp141e30jsnb64a03ad4030",
		},
	};

	return axios
		.request(options)
		.then(({ data }) => {
			if (data.name) {
				return adaptProductsDetail(data);
			} else {
				return [];
			}
		})
		.catch(function (error) {
			console.error(error.message);
		});
}

module.exports = getApiProductsDetail;
