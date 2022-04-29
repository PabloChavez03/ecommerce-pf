const axios = require("axios");
const adaptProductsDetail = require("../adapters/productsDetail.adapter");

function getApiProductsDetail(productId) {
  const options = {
    method: "GET",
    url: "https://asos2.p.rapidapi.com/products/v3/detail",
    params: {
      id: `${productId}`,
      currency: "USD",
      sizeSchema: "US",
      store: "US",
      lang: "en-US",
    },
    headers: {
      "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      "X-RapidAPI-Key": "324a0d5d1emshad70a2c958f1e4cp140a43jsn270daa51ceb2",
    },
  };

  return axios
    .request(options)
    .then(({ data }) => adaptProductsDetail(data))
    .catch(function (error) {
      console.error(error.message);
    });
}

// getApiProductsDetail(9851612).then((data) => console.log(data));

// function getAPIproducts(categoryId) {
// 	const options = {
// 		method: "GET",
// 		url: "https://asos2.p.rapidapi.com/products/v2/list",
// 		params: {
// 			store: "US",
// 			offset: "0",
// 			categoryId: `${categoryId}`,
// 			limit: "48",
// 		},
// 		headers: {
// 			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
// 			"X-RapidAPI-Key": "b78c7a3b2fmsh0b41ed6110ef2c5p1eb5cfjsnb1b10669361b",
// 		},
// 	};

// 	return axios(options)
// 		.then(({ data }) => adaptProducts(data))
// 		.catch((e) => console.log(e.message));
// }

module.exports = getApiProductsDetail;
