const { Router } = require("express");
const { Product, ProductDetail, Category } = require("../src/db");
const router = Router();

router.patch("/restar", async (req, res) => {
  const { productsChanged } = req.body;

  console.log(productsChanged);

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
                stock: variant.stock - quantity,
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

module.exports = router;
