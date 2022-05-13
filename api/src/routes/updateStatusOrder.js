const { Router } = require("express");
const { Order } = require("../db");
const router = Router();

router.patch("/:payment_id", async (req, res) => {
  const { status } = req.body;
  const {payment_id} = req.params;

  try {
    const statusOrder = await Order.update({ status }, {where: {payment_id}});
    res.status(201).json(statusOrder + "Se modifico el estado de su orden" );
  } catch (error) {
    console.log(error)
  }


});

module.exports = router;