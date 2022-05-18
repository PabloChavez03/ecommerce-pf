const { Category } = require("../db");

const { Router } = require("express");
const router = Router();

//! ACTIVAR AUTENTICACION INDEX 23

router.post("", async (req, res) => {
	const {
		payload: { id, title, genre },
	} = req.body;

	if (typeof id !== "number") res.send("El id debe ser numérico");
	if (typeof title !== "string") res.send("El título debe ser texto");

	const exists = await Category.findOne({ where: { id } });

	if (exists) res.send("No puede crear una categoría con un id existente");
	else {
		await Category.findOrCreate({
			where: {
				id,
				title,
				genre,
			},
		}).catch((e) => console.log(e));

		res.status(201).send("Creado exitosamente");
	}
});

router.patch("/:id", async (req, res) => {
	const { id } = req.params;
	const {
		payload: { title, genre },
	} = req.body;

	await Category.update(
		{ title, genre },
		{
			where: {
				id,
			},
		},
	).catch((e) => console.log(e));

	res.send("Categoría actualizada correctamente");
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	await Category.destroy({
		where: {
			id,
		},
	});

	res.send("Categoría eliminada correctamente");
});

module.exports = router;
