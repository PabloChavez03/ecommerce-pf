const { text } = require("body-parser");
const { Router } = require("express");
const { transporter, publicidadEmail } = require("../controllers/mailer");
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

router.get('/cliente/enviar-verificacion', async (req, res) => {
    const { emailGoogle, emailDescription } = req.query;
})

module.exports = router;
