const axios = require("axios");
const adaptProductsDetail = require("./productsDetailAdapter");

function getApiProductsDetail(productId) {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/products/v3/detail",
		params: { id: `${productId}` },
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "43f8cee434msh898059380623818p1cc12cjsn8c01f4da69cf",
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
