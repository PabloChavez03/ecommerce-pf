const nodemailer = require("nodemailer");

// Funcion principar de Transport
const createTrans = ()  => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e026217f7741dc",
            pass: "77230e0f68397c"
        }
    })
    return transport
}

const sendMail = async () => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Fred Foo" <foo@example.com>',
        to: "bar@example.com, baz@example.com",
        subject: "Hello",
        // html: <b>Hello world?</b>
    })
    console.log("Message sent: %s", info.messageId);
    return
}

// export.sendMail = () => sendMail()