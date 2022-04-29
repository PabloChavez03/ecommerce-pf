const setDDBBcategories = require("./categoriesDB.setter.service");

const { Category } = require("../../../../db");

async function getDDBBcategories() {
	await setDDBBcategories();

	return await Category.findAll();
}

module.exports = getDDBBcategories;
