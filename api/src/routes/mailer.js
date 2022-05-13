const { text } = require("body-parser");
const { Router } = require("express");
const { transporter, publicidadEmail, newRegistroCliente, ordenDeCompraMail } = require("../controllers/mailer");
require("dotenv").config();
const { USER_GOOGLE, PASS_GOOGLE } = process.env;
const router = Router();

router.get('/', async (req, res) => {
    const { emailGoogle } = req.body
    try {
        // send mail with defined transport object
        await transporter.sendMail({
            from: `"PRUEBA XD👻" ${USER_GOOGLE}`,
            to: emailGoogle,
            subject: "Hello ✔",
            html: `
            <b>Plase click in the following link, or paste this into your browser to complete the process:</b>
            <p>XD</p>
            `
        }).then(() => res.json("logrado"));
    } catch (error) {
        console.log(error)
    }
})

router.get('/publicidad', async (req, res) => {
    const { emailGoogle, emailImagenTitle, emailAsunto, emailTitulo, emailSubTitle, emailDescription } = req.body;
    try {
        await publicidadEmail({ emailGoogle, emailImagenTitle, emailAsunto, emailTitulo, emailSubTitle, emailDescription })
            .then(() => res.json({ "Info": "Enviado Publicidad" }));
    } catch (err) {
        console.log(err)
    }
})

router.get('/newCliente', async (req, res) => {
    const { emailGoogle, emailUsuario } = req.body;
    try {
        await newRegistroCliente({ emailGoogle, emailUsuario })
            .then((item) => res.json(item))
    } catch (err) {
        console.log(err)
    }
})
router.get('/OrdenCompra', async (req, res) => {
    const { orderDetails, total, status, email, date } = req.body;
    try {
        await ordenDeCompraMail({ orderDetails, total, status, email, date })
            .then((item) => res.json(item))
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
