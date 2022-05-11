const { Router } = require("express");
const { Users, Order, PaymentResponse } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { orderDetails, total, email } = req.body;

  const date = Date.now();

  try {

    let ordenDeCompra = await Order.create({
      total,
      orderDetails, //DataTypes.ARRAY(DataTypes.JSON) <--
      orderDate: date,
    });

    let paymentResponse = await PaymentResponse.create({
      status: null,
      payment_id: null,
    });

    let client = await Users.findOne({ where: { email: email } });
  

    await client.addOrder(ordenDeCompra);

    await paymentResponse.addOrder(ordenDeCompra);


    return res.status(201).json({ message: "Se creo la orden de compra" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
