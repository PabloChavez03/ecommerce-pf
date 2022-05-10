const { Router } = require("express");
const { Cliente, Order, Invoice} = require("../db");
const router = Router();

router.post("/", async (req, res) => {  
    const {orderDetails, total, orderStatus, dni_client} = req.body;
    console.log("aquiiiiiiiiii" + req.body)

    try {
        let ordenDeCompra = await Order.create({ 
            total,
            orderStatus,
            orderDetails,
            
        })
        let response = await Cliente.findByPk(dni_client);
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
       res.status(200).json(ordenDeCompra)

        

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;