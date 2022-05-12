const { Router } = require("express");
const { ordenDeCompraMail } = require("../controllers/mailer");
const { Users, Order, Invoice } = require("../db");
const router = Router();

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

router.post("/", async (req, res) => {
  const { payment_id, orderDetails, total, status, email } = req.body;

  const date = Date.now();

  let newDate = formatDate(date);

  

  try {
    let ordenDeCompra = await Order.create({
      payment_id: Number(payment_id),
      orderDetails,
      total: Number(total),
      orderDate: newDate,
      status,
    });

    let client = await Users.findOne({ where: { email: email } });

    // console.log(client)

    await client.addOrder(ordenDeCompra);
    ///Email 
    await ordenDeCompraMail({ orderDetails, total, status, email, newDate })
    //
    res.status(201).json(ordenDeCompra);
  } catch (error) {
    return res.status(409).send({ message: error })
  }
});

module.exports = router;
