const { Router } = require("express");
const { Product, ProductDetail, Category } = require("../db");
const router = Router();
const { checkStock } = require("../../notUsed/checkStockMiddleware");

router.patch("/restar", checkStock , async (req, res) => {
  const { productsChanged } = req.body;

  console.log(productsChanged);

	let sinStock = [];

  if (productsChanged) {
    try {
      for (let product of productsChanged) {
        const { id, brandSize, quantity } = product;
        let productFound = await Product.findByPk(id);
        let productDetailFound = await ProductDetail.findByPk(id);

        productDetailFound.variants = productDetailFound.variants.map(
          (variant) => {
            if (variant.brandSize === brandSize) {
              return {
                ...variant,
                stock: variant.stock < 1 ? null : variant.stock - quantity,
                isInStock: variant.stock - quantity > 0 ? true : false,
              };
            }

            return variant;
          }
        );

        await productDetailFound.save();

        const isThereProducts = productDetailFound.variants.reduce(
          (totalStock, variant) => totalStock + variant.stock,
          0
        );

        if (isThereProducts < 1) {
          await productFound.update({ isInStock: false });
          await productFound.save();
        }
      }

      return res.status(200).send("Stock actualizado");
    } catch (error) {
      return res.status(409).json({ error: error.message });
    }
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
});

router.patch("/sumar", async (req, res) => {
  const { productsChanged } = req.body;

  if (productsChanged) {
    try {
      for (let product of productsChanged) {
        const { id, brandSize, quantity } = product;

        let productFound = await Product.findByPk(id);
        let productDetailFound = await ProductDetail.findByPk(id);

        productDetailFound.variants = await productDetailFound.variants.map(
          (variant) => {
            if (variant.brandSize === brandSize) {
              return {
                ...variant,
                stock: variant.stock + quantity,
                isInStock: variant.stock + quantity > 0 ? true : false,
              };
            }

            return variant;
          }
        );

        await productDetailFound.save();

        const isThereProducts = productDetailFound.variants.reduce(
          (totalStock, variant) => totalStock + variant.stock,
          0
        );

        if (isThereProducts > 1) {
          await productFound.update({ isInStock: true });
          await productFound.save();
        }
      }

      return res.status(200).send("Stock actualizado");
    } catch (error) {
      return res.status(409).json({ error: error.message });
    }
  } else {
    return res.status(404).json({ error: "No se encuentra el producto" });
  }
});

module.exports = router;
