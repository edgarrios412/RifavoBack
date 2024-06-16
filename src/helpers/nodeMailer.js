const nodemailer = require("nodemailer");
const { mailRecovery } = require("./plantillas/mailRecovery");

const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 25,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "atencionalcliente@rifavo.com",
    pass: "Qwerty.123",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Server is ready to take our messages:', success);
  }
});

module.exports = {
    sendMailRecovery: async (email, newPassword) => {
        const info = await transporter.sendMail({
          from: '"Equipo Rifavo 👻" <atencionalcliente@rifavo.com>', // sender address
          to: email, // list of receivers
          subject: "Hemos reestablecido tu contraseña", // Subject line
          text: "Ahora tu contraseña es: "+ newPassword, // plain text body
          html: mailRecovery(newPassword), // html body
        });
        console.log("Message sent: %s", info.messageId);
    },
    sendMailCompra: async (email, tickets) => {
      const info = await transporter.sendMail({
        from: '"Equipo Rifavo 👻" <atencionalcliente@rifavo.com>', // sender address
        to: email, // list of receivers
        subject: "Comprobante de compra", // Subject line
        html: `<b>Tu compra ha sido exitosa, compraste los siguientes numeros ${tickets.map(t => String(t).padStart(3,"0"))}</b>`, // html body
      });
      console.log("Message sent: %s", info.messageId);
  },
  sendMailGanador: async (email, premio) => {
    const info = await transporter.sendMail({
      from: '"Equipo Rifavo 👻" <atencionalcliente@rifavo.com>', // sender address
      to: email, // list of receivers
      subject: "¡Felicidades has ganado!", // Subject line
      html: `<b>Has ganado ${premio}!, en breves el equipo de Rifavo se pondrá en contacto contigo!</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
}
}