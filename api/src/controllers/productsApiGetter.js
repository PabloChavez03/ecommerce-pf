const axios = require("axios");
const adaptListProducts = require("./productsAdapter");

async function getAPIproducts(categoryId) {
	const options = {

    method: "GET",
    url: "https://asos2.p.rapidapi.com/products/v2/list",
    params: {
      store: "US",
      offset: "0",
      categoryId: `${categoryId}`,
      limit: "48",
      // q: query
    },
    headers: {
      "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      "X-RapidAPI-Key": "8fd290f142msha910e016bf6105fp134a44jsnc9cf0818de6f",
    },
  };

	return axios(options)
		.then(({ data }) => adaptListProducts(data))
		.catch((e) => console.log(e.message));
}

module.exports = getAPIproducts;
