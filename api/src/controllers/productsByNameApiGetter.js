const axios = require("axios");
const adaptListProducts = require("./productsByNameAdapter");

async function getAPIproducts(productName) {
	const options = {
<<<<<<< HEAD
		method: "GET",
		url: "https://asos2.p.rapidapi.com/products/v2/list",
		params: {
			store: "US",
			offset: "0",
			categoryId: "0",
			limit: "48",
			q: `${productName}`,
		},
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "eb54dd77f1msh905b4c74d0c9228p185e3bjsn3d4a4d9f9628",
		},
	};
=======
    method: "GET",
    url: "https://asos2.p.rapidapi.com/products/v2/list",
    params: {
      store: "US",
      offset: "0",
      categoryId: "0",
      limit: "48",
      q: `${productName}`,
    },
    headers: {
      "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      "X-RapidAPI-Key": "87b0d49655msh390fe3ed9c5a302p187d78jsn880485f91e64",
    },
  };
>>>>>>> 38bf3a432bdf220e6f39e3ce7e0ced4e9c3ab5a8

	return axios(options)
		.then(({ data }) => adaptListProducts(data))
		.catch((e) => console.log(e.message));
}

module.exports = getAPIproducts;
