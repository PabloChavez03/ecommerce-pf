const axios = require("axios");
const adaptProductsDetail = require("./productsDetailAdapter");

function getApiProductsDetail(productId) {
	const options = {
    method: "GET",
    url: "https://asos2.p.rapidapi.com/products/v3/detail",
    params: { id: `${productId}` },
    headers: {
      "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      "X-RapidAPI-Key": "eb54dd77f1msh905b4c74d0c9228p185e3bjsn3d4a4d9f9628",
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
