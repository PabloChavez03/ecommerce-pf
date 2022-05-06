const Router = require("express");
const router = Router();
const PaymentsController = require("../controllers/PaymentsController");
const PaymentsService = require("../Services/PaymentsService");
const PaymentsInstance = new PaymentsController(new PaymentsService());



router.post("/payment", async (req, res) => {
    PaymentsInstance.getPaymentLink(req, res);
});

module.exports = router;