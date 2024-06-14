const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "edgarrios412@gmail.com",
    pass: "rlvm ndcq dmwn knla",
  },
});

module.exports = {
    sendMailRecovery: async (email, newPassword) => {
        const info = await transporter.sendMail({
          from: '"Equipo Rifavo 👻" <rifavo@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Hemos reestablecido tu contraseña", // Subject line
          text: "Ahora tu contraseña es: "+ newPassword, // plain text body
          html: `<b>Ahora tu contraseña es: ${newPassword}</b>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
    },
    sendMailCompra: async (email, tickets) => {
      const info = await transporter.sendMail({
        from: '"Equipo Rifavo 👻" <rifavo@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Comprobante de compra", // Subject line
        html: `<b>Tu compra ha sido exitosa, compraste los siguientes numeros ${tickets.map(t => String(t).padStart(3,"0"))}</b>`, // html body
      });
      console.log("Message sent: %s", info.messageId);
  },
  sendMailGanador: async (email, premio) => {
    const info = await transporter.sendMail({
      from: '"Equipo Rifavo 👻" <rifavo@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "¡Felicidades has ganado!", // Subject line
      html: `<b>Has ganado ${premio}!, en breves el equipo de Rifavo se pondrá en contacto contigo!</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
}
}