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
router.use("/products", require("./routers/getProductsByName"));
router.use("/products/detail", require("./routers/getProductsDetails"));
router.use("/client", require("./routers/Clients/routesClient/index"));


// Modularizando las rutas
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/carrito", require("../routes/routers/carrito"));
router.use("/allproducts", require("../routes/routers/getAllProducts"));

module.exports = router;
