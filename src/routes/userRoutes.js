const {Router} = require("express")
const userRoutes = Router()
const {newUser,recoveryPassword, readAllNotification, verifyUser, authUser, putUser, getUsers, getUser, getUserByToken, deleteUser, createTicket, changePassword, createNotification, addHistorial, setResponseTicket, getTickets, generateKey, newPay} = require("../controllers/userController")
// const { sendMail } = require("../helpers/nodeMailer")

userRoutes.get("/", async (req,res) => {
    try{
        const users = await getUsers()
        res.json(users)

    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/pay/integrity", async (req,res) => {
    try{
        const users = await newPay(req.body)
        res.json(users)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.get("/:id", async (req,res) => {
    try{
        const user = await getUser(req.params.id)
        res.json(user)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.get("/ticket/listar", async (req,res) => {
    try{
        const user = await getTickets()
        res.json(user)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.put("/ticket/response", async (req,res) => {
    try{
        const user = await setResponseTicket(req.body)
        res.json(user)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.get("/token/:token", async (req,res) => {
    try{
        const user = await getUserByToken(req.params.token)
        res.json(user)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/verify", async (req,res) => {
    try{
    const {status,user,token} = await verifyUser(req.body)
    res.json({status:status,user:user, token:token})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/auth", async (req,res) => {
    try{
    const token = await authUser(req.body)
    res.json(token)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/", async (req,res) => {
    try{
        const user = await newUser(req.body)
        res.json({users:user})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/ticket", async (req,res) => {
    try{
        const ticket = await createTicket(req.body)
        res.json({response:ticket})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/recovery/password", async (req,res) => {
    try{
        const message = await recoveryPassword(req.body)
        res.json(message)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/historial", async (req,res) => {
    try{
        const historial = await addHistorial(req.body)
        res.json({response:historial})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/service/generateKey", async (req,res) => {
    try{
        const key = await generateKey(req.body)
        res.json(key)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.put("/", async (req,res) => {
    try{
    const edit = await putUser(req.body)
    res.json({users:edit})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.put("/password", async (req,res) => {
    try{
    const edit = await changePassword(req.body)
    res.json({response:edit})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.put("/notificaciones/readAll", async (req,res) => {
    try{
    const edit = await readAllNotification(req.body.userId)
    res.json({response:edit})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.delete("/:id", async (req,res) => {
    try{
    const user = await deleteUser(req.params.id)
    res.json({status:user})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

module.exports = userRoutes