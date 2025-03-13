const nodemailer = require("nodemailer");
const { mailRegister } = require("./plantillas/mailRegister");
const { mailRecovery } = require("./plantillas/mailRecovery");
const { mailCompra } = require("./plantillas/mailCompra");
const { mailGanador } = require("./plantillas/mailGanador");

const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465, // Cambia a 465 si estás usando SSL
  secure: true, // Cambia a `true` si usas el puerto 465
  auth: {
    user: "admin@rifavo.com",
    pass: "Rifavo2025.com",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Server is ready to take our messages:", success);
  }
});

module.exports = {
  sendMailRegister: async (email, newPassword) => {
    const info = await transporter.sendMail({
      from: '"Equipo Rifavo" <admin@rifavo.com>', // sender address
      to: email, // list of receivers
      subject: "Bienvenido a RIFAVO", // Subject line
      text: "Estos son tus datos de acceso a Rifavo", // plain text body
      html: mailRegister(newPassword), // html body
    });
    console.log("Message sent: %s", info.messageId);
  },
  sendMailRecovery: async (email, newPassword) => {
    const info = await transporter.sendMail({
      from: '"Equipo Rifavo" <admin@rifavo.com>', // sender address
      to: email, // list of receivers
      subject: "Hemos reestablecido tu contraseña", // Subject line
      text: "Ahora tu contraseña es: " + newPassword, // plain text body
      html: mailRecovery(newPassword), // html body
    });
    console.log("Message sent: %s", info.messageId);
  },
  sendMailCompra: async (email, tickets, sorteoId) => {
    const info = await transporter.sendMail({
      from: '"Equipo Rifavo" <admin@rifavo.com>', // sender address
      to: email, // list of receivers
      subject: "Comprobante de compra", // Subject line
      html: mailCompra(tickets.map((t) => String(t).padStart(3, "0")), sorteoId), // html body
    });
    console.log("Message sent: %s", info.messageId);
  },
  sendMailGanador: async (email, premio, numero, loteria) => {
    const info = await transporter.sendMail({
      from: '"Equipo Rifavo" <admin@rifavo.com>', // sender address
      to: email, // list of receivers
      subject: "¡Felicidades has ganado!", // Subject line
      html: mailGanador(numero, loteria, premio), // html body
    });
    console.log("Message sent: %s", info.messageId);
  },
};
