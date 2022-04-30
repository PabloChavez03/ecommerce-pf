const axios = require("axios");
const adaptCategory = require("./categoriesAdapter");

async function getAPIcategories() {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/categories/list",
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "87b0d49655msh390fe3ed9c5a302p187d78jsn880485f91e64",
		},
	};

	return await axios(options)
		.then(({ data }) => adaptCategory(data))
		.catch((e) => e.message);
}

module.exports = getAPIcategories;
