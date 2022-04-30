const axios = require("axios");
const adaptProductsDetail = require("./productsDetailAdapter");

function getApiProductsDetail(productId) {
	const options = {

    method: "GET",
    url: "https://asos2.p.rapidapi.com/products/v3/detail",
    params: { id: `${productId}` },
    headers: {
      "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      "X-RapidAPI-Key": "8fd290f142msha910e016bf6105fp134a44jsnc9cf0818de6f",
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
