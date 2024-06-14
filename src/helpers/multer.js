const multer = require("multer")
const path = require("node:path")
const {ROUTE_FILES, MAX_MB_SIZE_FILE} = process.env

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, ROUTE_FILES);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.split('.')[0] + '@' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage, limits: { fileSize: MAX_MB_SIZE_FILE * 1048576 } });

module.exports = upload