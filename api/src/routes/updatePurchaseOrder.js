const { Router } = require("express");
const { Users, Order, Invoice } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { orderDetails, total, dni_client } = req.body;
  //   console.log("aquiiiiiiiiii" + orderDetails);

  const date = Date.now();

  try {
    let ordenDeCompra = await Order.create({
      total,
      orderStatus: null,
      orderDetails, //DataTypes.ARRAY(DataTypes.JSON) <--
      orderDate: date,
    });

    let client = await Users.findOne({ where: { dni_client: dni_client } });

    // console.log(client)

    await client.addOrder(ordenDeCompra);
    // await ordenDeCompra.addUsers(client);

    // let orderId = ordenDeCompra.orderId;

    // if (ordenDeCompra.orderStatus === "Completed") {
    //   let newInvoice = await Invoice.create({
    //     invoice_date: date,
    //     invoice_ammount: total,
    //   });

    //   ordenDeCompra.setInvoice(newInvoice);
    //   console.log(newInvoice);

    return res.status(201).json({ message: "Se creo la orden de compra" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
