const { Router } = require("express");
const { ordenDeCompraMail } = require("../controllers/mailer");
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

    // console.log(client)

    await client.addOrder(ordenDeCompra);
    ///Email 
    await ordenDeCompraMail({ orderDetails, total, status, email, date })
    //
    res.status(201).json(ordenDeCompra);
  } catch (error) {
    return res.status(409).send({ message: error })
  }
});

module.exports = router;
