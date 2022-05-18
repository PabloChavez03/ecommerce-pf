const { Router } = require("express");
const {
	chat_bot,
	addReceptor,
	allReceptor,
	updateReceptor,
	deleteReceptor,
	allEmisor,
	addEmisor,
	updateEmisor,
	deleteEmisor,
} = require("../controllers/chatBot");
const router = Router();

router.get("/", async (req, res) => {
	chat_bot(req.query.dataString).then((item) => res.json(item));
});
/**                    EMISOR                          */
//////////////////////////////////////////////////////////////////////////////////////////////////////
////Mostrar todo los Emisor
router.get("/emisor", async (req, res) => {
	allEmisor().then((item) => res.json(item));
});
//Agregar un nuevo Emisor
router.post("/emisor", async (req, res) => {
	const { name, respuesta, isActive, receptor } = req.body;
	addEmisor({ name, isActive, respuesta, receptor }).then((item) =>
		res.json(item),
	);
});
//Editar el Emisor por parametro {id, name, isActive} se puede obviar el isActive pero
router.put("/emisor", async (req, res) => {
	const { id, name, respuesta, isActive, alternativa } = req.body;
	updateEmisor({ id, name, respuesta, isActive, alternativa }).then((item) =>
		res.json(item),
	);
});
//Borrar el Emisor por {id}
router.delete("/emisor", async (req, res) => {
	const { id } = req.body;
	await deleteEmisor({ id }).then((item) => res.json(item));
});
/**                    RECEPTOR                          */
////////////////////////////////////////////////////////////////////////////////////////
////Mostrar todo los Receptores
router.get("/receptor", async (req, res) => {
	allReceptor().then((item) => res.json(item));
});
//Agregar un nuevo Receptor
router.post("/receptor", async (req, res) => {
	const { name, isActive } = req.body;
	addReceptor({ name, isActive }).then((item) => res.json(item));
});
//Editar el receptor por parametro {id, name, isActive} se puede obviar el isActive pero
router.put("/receptor", async (req, res) => {
	const { id, name, isActive } = req.body;
	updateReceptor({ id, name, isActive }).then((item) => res.json(item));
});
//Borrar el receptor por {id}
router.delete("/receptor", async (req, res) => {
	const { id } = req.body;
	await deleteReceptor({ id }).then((item) => res.json(item));
});
module.exports = router;
