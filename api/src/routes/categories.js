const getDDBBcategories = require("../controllers/categoriesDbGetter");
const { Category } = require("../db");

const { Router } = require("express");
const router = Router();

router.get("", async (_req, res) => {
	const categoriesFound = await getDDBBcategories();

	res.json(categoriesFound);
});

router.post("", async (req, res) => {
	const { id, title, genre } = req.body;

	let [categoryCreated, created] = await Category.findOrCreate({
		where: {
			id,
			title,
			genre,
		},
	}).catch((e) => console.log(e));

	created
		? res.status(201).send("Creado exitosamente")
		: res.send("Producto existente");
});

module.exports = router;
