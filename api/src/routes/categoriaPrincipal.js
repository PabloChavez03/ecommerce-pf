const { Router } = require("express");
const { getAllCategoriesMain } = require("../controllers/api");

const routerCategoriaPrincipal = Router();

routerCategoriaPrincipal.get("/", async (req, res) => {
	// Aqui va la primera ruta
	let allCategories = await getAllCategoriesMain();
	res.status(200).json(allCategories);
});
module.exports = routerCategoriaPrincipal;
