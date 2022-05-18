const { Router } = require("express");
const { Order, Users} = require("../db");
const { route } = require("./postPurchaseOrder");
const router = Router();


router.get("/:payment_id", async (req, res) => {

    const {payment_id} = req.params;

    try {
        if (payment_id) {
            let findOrder = await Order.findByPk(payment_id);
            return res.status(200).json(findOrder);
        }

        return res.status(404).json({ message: "payment_id is invalid or undefined" })
    } catch (error) {
        return res.status(409).json({ message: error })
    }
});

module.exports = router;