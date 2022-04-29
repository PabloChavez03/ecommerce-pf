const { Router } = require("express");
const { getAllCategoriesMain } = require("../controllers/api");
const { Categoria_principal } = require('../db');

const routerCategoriaPrincipal = Router();

routerCategoriaPrincipal.get("/", async (req, res) => {
	// Aqui va la primera ruta
	let allCategories = await getAllCategoriesMain();
	try {
		const nameCategories = allCategories?.map((el) => el.name);

		nameCategories.forEach((categories) => {
			Categoria_principal.findOrCreate({
				where: {
					name: categories,
				}
			})
		});

		let categoriesDb = await Categoria_principal.findAll();

		res.status(200).json(categoriesDb);
	} catch (error) {
		return new Error(error);
	}
});
module.exports = routerCategoriaPrincipal;
