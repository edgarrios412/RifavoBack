const {Router} = require("express")
const userRoutes = require("./userRoutes")
const sorteoRoutes = require("./sorteoRoutes")
const { getYesterdayDate } = require("../helpers/getFirstSaturday")
const indexRoutes = Router()

indexRoutes.use("/user", userRoutes)
indexRoutes.use("/sorteo", sorteoRoutes)

module.exports = indexRoutes