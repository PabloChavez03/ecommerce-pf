const Router = require("express");
const router = Router();
const PaymentsController = require("../controllers/PaymentsController");
const PaymentsService = require("../Services/PaymentsService");

router.get("/payment", async (req, res) => {
	const { email, cartItems } = req.query;

	const products = cartItems.map((product) => {
		product = JSON.parse(product);

		return {
			title: product.name,
			quantity: product.quantity,
			unit_price: product.currentPrice,
		};
	});

	const PaymentsInstance = new PaymentsController(
		new PaymentsService(products, email),
	);
	PaymentsInstance.getPaymentLink(req, res);
});

module.exports = router;
