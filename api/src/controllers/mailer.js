const nodemailer = require(`nodemailer`)
require("dotenv").config();
const { USER_GOOGLE, PASS_GOOGLE } = process.env;
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  service: 'gmail',
  auth: {
    user: USER_GOOGLE, // generated ethereal user
    pass: PASS_GOOGLE, // generated ethereal password
  },
});
transporter.verify().then(() => {
  console.log('Ready for send emails');
})


async function publicidadEmail({ emailGoogle, emailAsunto, emailImagenTitle, emailTitulo, emailSubTitle, emailDescription }) {
  await transporter.sendMail({
    from: `"CLOTHES 22" ${USER_GOOGLE}`,
    to: emailGoogle,
    subject: emailAsunto,
    html: `
        <div style="width: 80%; margin: auto; border: 0px solid black">
      <div style="width: 100%; background-color: #90006f; display: flex">
        <h1 style="color: white; padding: 0px 20px">CLOTHES 22</h1>
      </div>
      <div style="padding: 0px 20px 20px">
        <h2 style="color: #90006f">¡Ultima oportunidad para ahorrar!</h2>
        <p>
          Compra nuestros productos a 50% de descuento, de toda la linea de
          calzados y ropa
        </p>
        <img style="width: 100%;margin-bottom: 20px;" src="https://viernesnegro.net/wp-content/uploads/thumbs_dir/ofertas-de-ropa-black-friday-ofou2hqn33oydu8pupxgpuels4vg64tn3biu43h8dc.jpg" alt="">
        <a
          style="
            text-decoration: none;
            background-color: #90006f;
            color: white;
            padding: 10px;
            cursor: pointer;
          "
          href=""
          >Compra ya!</a
        >
      </div>
      <hr style="color: #90006f; border: 1px solid #90006f" />
      <footer style="padding: 0px 20px 20px">
        <p style="font-size: 12px">
          Si necesitas asistencia tecnica, ponte en contacto con la
          <a href="" style="text-decoration: none; color: #90006f"
            >Ayuda de CLOTHES 22</a
          >
        </p>
        <p style="font-size: 12px">
          <b>CLOTHES 22</b> te notificara la actividad nueva relacionada
          contigo. Puedes personalizar estos correos elentronico o desactiarlos
          en cualquier momento.
        </p>
        <p style="font-size: 12px">
          Tu uso de <b>CLOTHES 22</b> esta sujeto a las condiciones del servicio
          y la Politica de privacidad de las Normas de la comunidad de
          <b>CLOTHES 22</b>.
        </p>
      </footer>
    </div>
        `
  })
}

async function newRegistroCliente(emailGoogle, emailUsuario) {

  if (emailGoogle) {
    if (emailUsuario) {
      await transporter.sendMail({
        from: `"CLOTHES 22" ${USER_GOOGLE}`,
        to: emailGoogle,
        subject: 'Bienvenido a la familia CLOTHES 22',
        html: `
                <div style="width: 80%; margin: auto; border: 0px solid black">
              <div style="width: 100%; background-color: #90006f; display: flex">
                <h1 style="color: white; padding: 0px 20px">CLOTHES 22</h1>
              </div>
              <div style="padding: 0px 20px 20px">
                <h2 style="color: #90006f;">Hola ${emailUsuario}!</h2>
                <p>¡Bienvenido, Gracias por unirte a <b>CLOTHES 22</b>!.</p>
        
                <p>
                  Para mantenerte al tanto, te vamos a notificar por correo elentronico
                  cuando haya actividad de Oferta.Puedes personalizar estos correos
                  electronicos o desactivarlos en cualquier momento enviando un correo
                  al <b>EJEMPLO@EJEMPLO.com</b>.
                </p>
                <div>
                  <p>
                    Estamos ansiosos por brindarle la mejor atencion para usted con
                    nuestra linea de productos de moda
                  </p>
                  <p>El equipo de CLOTHES 22</p>
                </div>
              </div>
              <hr style="color: #90006f; border: 1px solid #90006f" />
              <div style="padding: 0px 20px 20px">
                <p style="font-size: 12px">
                  Si necesitas asistencia tecnica, ponte en contacto con la
                  <a href="" style="text-decoration: none; color: #90006f"
                    >Ayuda de CLOTHES 22</a
                  >
                </p>
                <p style="font-size: 12px">
                  <b>CLOTHES 22</b> te notificara la actividad nueva relacionada
                  contigo. Puedes personalizar estos correos elentronico o desactiarlos
                  en cualquier momento.
                </p>
                <p style="font-size: 12px">
                  Tu uso de <b>CLOTHES 22</b> esta sujeto a las condiciones del servicio
                  y la Politica de privacidad de las Normas de la comunidad de
                  <b>CLOTHES 22</b>.
                </p>
              </div>
            </div>
                `
      })
      return { "Info": "Enviado Publicidad" }
    } else return { "Info": "Error no se ingreso el usuario" };
  } else return { "Info": "Error no se ingreso el correo" };
}

async function factura(emailGoogle, emailUsuario) { }

async function ordenDeCompra(order) {
  if(order){


    await transporter.sendMail({
      from: `"CLOTHES 22" ${USER_GOOGLE}`,
      to: order.email,
      subject: 'Estado de compra',
      html: `
      <div style="width: 80%; margin: auto; border: 0px solid black">
        <div style="width: 100%; background-color: #90006f; display: flex">
          <h1 style="color: white; padding: 0px 20px">CLOTHES 22</h1>
        </div>
        <div style="padding: 0px 20px 20px">
          <h2 style="color:#90006f;">Orden de compra</h2>
          <p>A realizado una compra en nuestra pagina CLOTHES 22</p>
          <table style="width: 100%">
            <tr style="background-color: rgb(116, 116, 116); color: white">
              <th style="padding: 10px 20px">Name of product</th>
              <th style="padding: 10px 20px">Quantity</th>
              <th style="padding: 10px 20px">Unit Price</th>
              <th style="padding: 10px 20px">Set price</th>
            </tr>
            <tr>
              <td style="padding: 10px 20px">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
                cupiditate. Distinctio, non? Cupiditate, dolorum aperiam!
              </td>
              <td style="padding: 10px 20px">5</td>
              <td style="padding: 10px 20px">$45</td>
              <td style="padding: 10px 20px">$225</td>
            </tr>
            <tr style="background-color: rgb(202, 202, 202); color: black">
              <td style="padding: 10px 20px;">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
                cupiditate. Distinctio, non? Cupiditate, dolorum aperiam!
              </td>
              <td style="padding: 10px 20px;">5</td>
              <td style="padding: 10px 20px;">$45</td>
              <td style="padding: 10px 20px;">$225</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td style="padding: 10px 20px;">Total</td>
              <td style="padding: 10px 20px;">$1242</td>
            </tr>
          </table>
        </div>
        <hr style="color: #90006f; border: 1px solid #90006f" />
        <footer style="padding: 0px 20px 20px">
          <p style="font-size: 12px">
            Si necesitas asistencia tecnica, ponte en contacto con la
            <a href="" style="text-decoration: none; color: #90006f"
              >Ayuda de CLOTHES 22</a
            >
          </p>
          <p style="font-size: 12px">
            <b>CLOTHES 22</b> te notificara la actividad nueva relacionada
            contigo. Puedes personalizar estos correos elentronico o desactiarlos
            en cualquier momento.
          </p>
          <p style="font-size: 12px">
            Tu uso de <b>CLOTHES 22</b> esta sujeto a las condiciones del servicio
            y la Politica de privacidad de las Normas de la comunidad de
            <b>CLOTHES 22</b>.
          </p>
        </footer>
      </div>
      `
    })
  }else return{"Info":"No se ingreso los datos"}
  
}

module.exports = {
  transporter,
  publicidadEmail,
  newRegistroCliente
}



// let order = {
//   payment_id: payment_id,
//   orderDetails: cartItems,
//   total: subTotal,
//   status: status,
//   email: email,
// };