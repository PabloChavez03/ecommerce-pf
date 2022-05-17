const { Product,ProductDetail } = require("../src/db");

const checkStock = async (req, res, next) => {
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

       sinStock = await productDetailFound.variants?.filter(el => el.stock === null);

       if (sinStock.length) {
         return res.status(404).json({ ...sinStock });
       }
     }
     next();
   } catch (error) {
     return res.status(409).json({ error: error.message });
   }
 } else {
   return res.status(404).json({ message: "Product not found" });
 }
};

module.exports = { checkStock };
