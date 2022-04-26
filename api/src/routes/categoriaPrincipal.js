const { Router } = require("express");
const { getAllCategories } = require("../controllers/api");

const routerCategoriaPrincipal = Router();

routerCategoriaPrincipal.get("/", async (req, res) => {
	// Aqui va la primera ruta
	let allCategories = await getAllCategories();
	res.status(200).json(allCategories);
});
module.exports = routerCategoriaPrincipal;
