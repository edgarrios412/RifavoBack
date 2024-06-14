const bcrypt = require("bcrypt")
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const encryptPassword = (password) => {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash
}

const verifyPassword = (password, hash) => {
    const response = bcrypt.compareSync(password, hash);
    return response
}

module.exports = {
    encryptPassword,
    verifyPassword
}