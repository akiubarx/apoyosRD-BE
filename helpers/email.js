import nodemailer from 'nodemailer';
/* import { SiteUrl } from '../helpers/routes.js' */

export const emailRegistro = async (datos) => {
  const { email,usuario, token } = datos;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "aff7e681a7e1f9",
      pass: "274fed214cbe13"
    }
  });

  // Informacion email
  const info = await transport.sendMail ({
    from: '"Sistema Apoyos RD" <cuentas@apoyosrd.com>',
    to: email,
    subject: "Sistema de Apoyos, comprueba tu cuenta",
    text: "Confirma tu cuenta",
    html: `<p>La cuenta con el nombre de usuario: <b>${usuario}</b> se creo en el Sistema de Apoyos RD</p>
    <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Da clic en este enlace para confirmar tu cuenta</a>
    `
  })
}