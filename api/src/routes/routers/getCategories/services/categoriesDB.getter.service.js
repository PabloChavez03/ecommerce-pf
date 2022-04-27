const setDDBBcategories = require("./categoriesDB.setter.service");

const { Category } = require("../../../../db.js");

async function getDDBBcategories() {
	await setDDBBcategories();

	const categories = await Category.findAll();

	return categories;
}

module.exports = getDDBBcategories;
