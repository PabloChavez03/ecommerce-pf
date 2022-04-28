const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Importando los archivos para las rutas
// Modularizando las rutas
<<<<<<< HEAD
const getCategories = require("./routers/getCategories");
const getProducts = require("./routers/getProducts");
=======
router.use("/productos", routerProductos);
router.use("/tipo-de-prenda", routerTipoDePrenda);
router.use("/categoria-principal", routerCategoriaPrincipal);
>>>>>>> 7c1cd538ef5f6b40e043cfaf73493f731d0a6d0a

router.use("/categories", getCategories);
router.use("/products", getProducts);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
