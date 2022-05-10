const { Router } = require("express");
const {PaymentResponse} = require("../db");
const router = Router();

router.post("", async (req, res) => {
const {payment_id, status} = req.body;
console.log(req.body)

try {
    let responsePayment = await PaymentResponse.create({payment_id, status})
   return responsePayment ? res.status(200).json(responsePayment) : res.status(404)
} catch (error) {
    console.log(error)
}

});

module.exports = router;