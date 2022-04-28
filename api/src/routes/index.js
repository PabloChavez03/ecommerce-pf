const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Importando los archivos para las rutas
// Modularizando las rutas
const getCategories = require("./routers/getCategories");
const getProducts = require("./routers/getProducts");

router.use("/categories", getCategories);
router.use("/products", getProducts);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
