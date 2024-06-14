const crypto = require("crypto");
const { Apikey } = require("../db");

module.exports = {
  generateApiKey: (length = 32) => {
    return crypto.randomBytes(length).toString("hex");
  },
  validateApiKey: async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res
          .status(403)
          .send({ message: "Tu petición no tiene cabecera de autorización" });
      }
      const api = req.headers.authorization.split(" ").at(-1);
      //   const payload = jwt.verify(token, KEY);
      const apiKey = await Apikey.findOne({ where: { key: api } });
      if(!apiKey){
        return res
          .status(403)
          .send({ message: "La proporcionada API KEY no es válida" });
      }
      apiKey.usage += 1
      apiKey.save() 
      //   req.userId = payload.id;
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
