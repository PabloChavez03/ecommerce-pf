const axios = require("axios");
const adaptCategory = require("./categoriesAdapter");

async function getAPIcategories() {
	const options = {
    method: "GET",
    url: "https://asos2.p.rapidapi.com/categories/list",
    headers: {
      "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      "X-RapidAPI-Key": "324a0d5d1emshad70a2c958f1e4cp140a43jsn270daa51ceb2",
    },
  };

	return await axios(options)
		.then(({ data }) => adaptCategory(data))
		.catch((e) => e.message);
}

module.exports = getAPIcategories;
