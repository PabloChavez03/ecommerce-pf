const axios = require("axios");
const adaptCategory = require("./categoriesAdapter");

async function getAPIcategories() {
	const options = {
<<<<<<< HEAD
		method: "GET",
		url: "https://asos2.p.rapidapi.com/categories/list",
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "b4419db468mshc852c1556d25a25p17fe32jsndbc31541a7c3",
		},
	};
=======

    method: "GET",
    url: "https://asos2.p.rapidapi.com/categories/list",
    headers: {
      "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      "X-RapidAPI-Key": "324a0d5d1emshad70a2c958f1e4cp140a43jsn270daa51ceb2",
    },
  };

>>>>>>> 17e473bad21985a981665d7473924d75af31daed

	return await axios(options)
		.then(({ data }) => adaptCategory(data))
		.catch((e) => e.message);
}

module.exports = getAPIcategories;
