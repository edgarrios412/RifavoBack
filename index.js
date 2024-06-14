const app = require("./src/app")
const {conn} = require("./src/db")
const PORT = process.env.PORT || 3001;

conn.sync({alter:true}).then(() => {
    console.log("Conectado a la base de datos")
    app.listen(PORT, () => {
        console.log("Servidor en linea en el puerto "+PORT)
    })
}, (e) => console.log("Ha ocurrido un error al sincronizar la base de datos: ",e))