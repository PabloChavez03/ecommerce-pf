const { Router } = require("express");
const { Users, Order, Invoice} = require("../db");
const router = Router();

router.post("/", async (req, res) => {  
    const {orderDetails, total, orderStatus, user_name, } = req.body;
    console.log("aquiiiiiiiiii" + orderDetails)

    try {
        let ordenDeCompra = await Order.create({ 
            total,
            orderStatus,
            orderDetails,
            
        })
        let response = await Users.findByPk(user_name);
        ordenDeCompra.setCliente(response)

     
        let orderId = ordenDeCompra.orderId;

        if (orderStatus === "Completed"){

            let date = Date.now();

            let newInvoice = await Invoice.create({ 
                invoice_date: date,
                invoice_ammount: total 
            })
            newInvoice.serOrder(orderId)
        }
      return res.status(200).json(ordenDeCompra)

        

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;