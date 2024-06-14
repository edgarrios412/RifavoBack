const jwt = require("jsonwebtoken");
const { KEY, EXPIRE_TOKEN } = process.env;
const moment = require("moment");

module.exports = {
  createToken: (data) => {
    const token = jwt.sign(data, KEY, { expiresIn: EXPIRE_TOKEN });
    return token;
  },

  decodeToken: async (token) => {
    try {
      const data = jwt.verify(token, KEY);
      return data;
    } catch (e) {
      if (e.name == "TokenExpiredError")
        return res.status(401).send({ message: "Tu sesión ha caducado" });
      if (e.name == "JsonWebTokenError")
        return res.status(401).send({ message: "Token invalido" });
      if (e.name == "NotBeforeError")
        return res.status(401).send({ message: "Token inactivo" });
      res.status(401).send({ message: e.message });
    }
  },

  isAuthenticated: (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res
          .status(403)
          .send({ message: "Tu petición no tiene cabecera de autorización" });
      }
      const token = req.headers.authorization.split(" ").at(-1);
      const payload = jwt.verify(token, KEY);

      req.userId = payload.id;
      next();
    } catch (e) {
      if (e.name == "TokenExpiredError")
        return res.status(401).send({ message: "Tu sesión ha caducado" });
      if (e.name == "JsonWebTokenError")
        return res.status(401).send({ message: "Token invalido" });
      if (e.name == "NotBeforeError")
        return res.status(401).send({ message: "Token inactivo" });
      res.status(401).send({ message: e.message });
    }
  },
};
