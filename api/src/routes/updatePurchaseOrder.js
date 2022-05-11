const { Router } = require("express");
const { Order, PaymentResponse } = require("../db");
const router = Router();

router.patch("/", async (req, res) => {
  const { status,payment_id } = req.body;

  // const date = Date.now();

  try {
    
    const paymentResponse = await PaymentResponse.update({
      status,
      payment_id,
    });



  } catch (error) {
    
  }

    return res.status(201).json({ message: "Se creo la orden de compra" });

});

module.exports = router;
