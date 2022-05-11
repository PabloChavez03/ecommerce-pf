const { Router } = require("express");
const { Users, Order, Invoice } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { payment_id, orderDetails, total, status, email } = req.body;

  const date = Date.now();

  try {
    let ordenDeCompra = await Order.create({
      payment_id: Number(payment_id),
      orderDetails,
      total: Number(total),
      orderDate: date,
      status,
    });

    let client = await Users.findOne({ where: { email: email } });

    console.log(client)

    await client.addOrder(ordenDeCompra);

    res.status(201).json(ordenDeCompra);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
