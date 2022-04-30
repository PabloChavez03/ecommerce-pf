const axios = require("axios");
const adaptCategory = require("./categoriesAdapter");

async function getAPIcategories() {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/categories/list",
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "b4419db468mshc852c1556d25a25p17fe32jsndbc31541a7c3",
		},
	};

	return await axios(options)
		.then(({ data }) => adaptCategory(data))
		.catch((e) => e.message);
}

module.exports = getAPIcategories;
