const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Importando los archivos para las rutas
// const routerProductos = require("./productos");
// const routerCategoriaPrincipal = require("./categoriaPrincipal");
// const routerTipoDePrenda = require("./tipoDePrenda");

// Modularizando las rutas
// router.use("/productos", routerProductos);
// router.use("/tipo-de-prenda", routerTipoDePrenda);
// router.use("/categoria-principal", routerCategoriaPrincipal);

router.use("/categories", require("./routers/getCategories"));
router.use("/products", require("./routers/getProducts"));

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
