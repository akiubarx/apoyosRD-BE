import nodemailer from 'nodemailer';
/* import { SiteUrl } from '../helpers/routes.js' */

export const emailRegistro = async (datos) => {
  const { email,usuario, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
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

export const missingPasswordMail = async (datos) => {
  const { email,usuario, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Informacion email
  const info = await transport.sendMail ({
    from: '"Sistema Apoyos RD" <cuentas@apoyosrd.com>',
    to: email,
    subject: "Sistema de Apoyos, Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `<p>La cuenta con el nombre de usuario: <b>${usuario}</b> solicito una recuperación de contraseña en el Sistema de Apoyos RD</p>
    <a href="${process.env.FRONTEND_URL}/recuperar-password/${token}">Da clic en este enlace para reestablecer tu password</a>
    `
  })
}