const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Importando los archivos para las rutas
const routerProductos = require("./productos");
const routerCategoriaPrincipal = require("./productos");
const routerTipoDePrenda = require("./productos");

// Modularizando las rutas
router.use("/productos", routerProductos);
router.use("/tipo-de-prenda", routerCategoriaPrincipal);
router.use("/categoria-principal", routerTipoDePrenda);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
