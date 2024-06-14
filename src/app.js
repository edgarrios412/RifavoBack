const express = require("express")
const app = express()
const indexRoutes = require("./routes/index")
const cors = require("cors")
const morgan = require("morgan")
const cron = require("node-cron")
const { elegirGanadores } = require("./helpers/elegirGanadores")

// TODOS LOS DOMINGOS A LAS 7AM // 0 7 * * 7
cron.schedule("0 7 * * 7", async () => {
    elegirGanadores()
})

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/", indexRoutes)

module.exports = app