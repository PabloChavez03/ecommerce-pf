const axios = require("axios");
const adaptCategory = require("./categoriesAdapter");

async function getAPIcategories() {
	const options = {

    method: "GET",
    url: "https://asos2.p.rapidapi.com/categories/list",
    headers: {
      "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      "X-RapidAPI-Key": "8fd290f142msha910e016bf6105fp134a44jsnc9cf0818de6f",
    },
  };


	return await axios(options)
		.then(({ data }) => adaptCategory(data))
		.catch((e) => e.message);
}

module.exports = getAPIcategories;
