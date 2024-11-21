const {
  User,
  Ticket,
  Ganadores,
  Sorteo,
  Notification,
  Historypay,
  Apikey,
} = require("../db");
const jwt = require("jsonwebtoken");
const { createToken, decodeToken } = require("../helpers/jwt");
const {
  encryptPassword,
  verifyPassword,
} = require("../helpers/encryptPassword");
// const { sendMailRecovery, sendMailRegister } = require("../helpers/nodeMailer");
const crypto = require('crypto');

module.exports = {
  newUser: async (data) => {
    const existMail = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (existMail) throw new Error("El correo electronico ingresado ya existe");
    var passwordEncripted;
    if(data.password){
      passwordEncripted = encryptPassword(data.password);
      await User.create({ ...data, password: passwordEncripted });
      return "Usuario creado exitosamente";
    } else{
      const newPassword = String(Math.floor(Math.random() * 10000000));
      passwordEncripted = encryptPassword(newPassword);
      // sendMailRegister(data.email, newPassword)
      await User.create({ ...data, password: passwordEncripted });
      return newPassword;
    }
  },
  newPay: async ({amountInCents,currency,reference, integrityKey}) => {
    const cadenaConcatenada = `${amountInCents}|${currency}|${reference}`;
    const hmac = crypto.createHmac('sha256', integrityKey);
    hmac.update(cadenaConcatenada);
    return hmac.digest('hex');
  },
  createNotification: async (body) => {
    const notification = await Notification.create(body);
    const user = await User.findByPk(body.userId);
    user.addNotification(notification);
    return "Notificacion creada exitosamente";
  },
  generateKey: async ({ userId, serviceId, plan }) => {
    const user = await User.findByPk(userId, { include: [{ model: Apikey }] });
    if (!user) throw new Error("El usuario no existe");
    if (user.apikeys.filter((a) => a.serviceId == serviceId).length)
      throw new Error(
        "Ya tienes un servicio contratado, contacta a soporte para actualizar tu plan"
      );
    const api = await Apikey.create({ serviceId, plan });
    user.addApikey(api);
    return api;
  },
  getUser: async (id) => {
    const user = await User.findByPk(id, {
      include: {
        model: Ticket,
        include:{
          model:Sorteo
        }
      },
    });
    if (!user) throw new Error("El usuario buscado no existe");
    return user;
  },
  getUserByToken: async (token) => {
    const { id } = jwt.verify(token, "test");
    const user = await User.findByPk(id, {
      include: {
        model: Ticket,
        include:{
          model:Sorteo,
          include:{
            model:Ganadores,
            include:{
              model:User
            }
          }
        }
      },
    });
    if (!user) throw new Error("El usuario buscado no existe");
    return user;
  },
  authUser: async (data) => {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
      include: {
        model: Ticket,
        include:{
          model:Sorteo,
          include:{
            model:Ganadores,
            include:{
              model:User
            }
          }
        }
      },
    });
    if (!user) throw new Error("Las credenciales no son correctas");
    if (!verifyPassword(data.password, user.password))
      throw new Error("Las credenciales no son correctas");
    const token = createToken({ id: user.id });
    return { user, token };
  },
  putUser: async (data) => {
    let user;
    if (data.newpass) {
      user = await User.findOne({
        where: {
          id: data.id,
          password: data.oldpass,
        },
      });
    } else {
      user = await User.findOne({
        where: {
          id: data.id,
          // password:data.oldpass
        },
      });
    }
    if (user) {
      user.password = data.newpass;
      user.image = data.image;
      user.save();
      return "Contraseña actualizada";
    }
    return "Contraseña anterior invalida";
  },
  changePassword: async (data) => {
    const user = await User.findByPk(data.userId);
    if (verifyPassword(data.password, user.password)) {
      const passwordEncripted = encryptPassword(data.newpassword);
      user.password = passwordEncripted;
      user.save();
      return "Contraseña actualizada exitosamente";
    } else throw new Error("La contraseña anterior es incorrecta");
  },
  getUsers: async () => {
    const users = await User.findAll();
    return users;
  },
  getTickets: async () => {
    const ticket = await Ticket.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    return ticket;
  },
  getTicketById: async (id) => {
    const ticket = await Ticket.findByPk(id);
    return ticket;
  },
  setResponseTicket: async (body) => {
    const ticket = await Ticket.findByPk(body.id);
    if (!ticket) throw new Error("No existe ese ticket");
    ticket.response = body.response;
    ticket.responseDate = new Date();
    ticket.save();
    const notification = await Notification.create({
      message: "Tu ticket ha sido respondido",
    });
    const user = await User.findByPk(ticket.userId);
    user.addNotification(notification);
    return ticket;
  },
  deleteUser: async (id) => {
    const user = await User.findOne({ where: { id: id } });
    await user.destroy();
    return "Usuario eliminado";
  },
  createTicket: async (body) => {
    const ticket = await Ticket.create({ message: body.message });
    const user = await User.findByPk(body.userId);
    user.addTicket(ticket);
    return "Ticket creado exitosamente";
  },
  recoveryPassword: async (data) => {
    const usuario = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (!usuario)
      throw Error("No existe ningún usuario con ese correo electrónico");
    const newPassword = String(Math.floor(Math.random() * 10000000));
    console.log(newPassword);
    const passwordEncripted = encryptPassword(newPassword);
    usuario.password = passwordEncripted;
    usuario.save();
    // sendMailRecovery(data.email, newPassword);
    return "Te hemos enviado un correo electrónico con tu nueva contraseña";
  },
  addHistorial: async (body) => {
    const historypay = await Historypay.create(body);
    const user = await User.findByPk(body.userId);
    if (body.status) {
      user.balance = Number(user.balance) + Number(body.amount);
      user.save();
    }
    user.addHistorypay(historypay);
    return "Historial agregado exitosamente";
  },
  readAllNotification: async (userId) => {
    const notifications = await Notification.findAll({
      where: { userId: userId },
    });
    for (let i = 0; i < notifications.length; i++) {
      notifications[i].read = true;
      notifications[i].save();
    }
    return "Todas las notificaciones fueron marcadas como leidas";
  },
};
