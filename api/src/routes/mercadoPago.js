const Router = require("express");
const router = Router();
const PaymentsController = require("../controllers/PaymentsController");
const PaymentsService = require("../Services/PaymentsService");

router.get("/payment", async (req, res) => {
  const { email, cartItems, envio } = req.query;

  if (cartItems) {
    try {
      const products = cartItems.map((product) => {
        product = JSON.parse(product);

        return {
          title: product.name,
          quantity: product.quantity,
          unit_price: product.currentPrice,
        };
      });

      const productsAndDelivery = [
        ...products,
        { title: "Shipping", quantity: 1, unit_price: Number(envio) },
      ];

      const PaymentsInstance = new PaymentsController(
        new PaymentsService(productsAndDelivery, email)
      );
      PaymentsInstance.getPaymentLink(req, res);
    } catch (error) {
      return res.status(409).json({ message: error });
    }
  } else {
		return res.status(404).json({ message: "te olvidaste el carrito pa"});
	}
});

module.exports = router;
