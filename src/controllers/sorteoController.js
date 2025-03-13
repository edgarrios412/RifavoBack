const {Sorteo, Ticket, User, Compras, Ganadores} = require("../db")
const jwt = require("jsonwebtoken")
const { sendMailCompra } = require("../helpers/nodeMailer")
const { getFirstSaturday } = require("../helpers/getFirstSaturday")

module.exports = {
    getSorteos: () => {
        const sorteos = Sorteo.findAll({
            include:{
                model:Ticket
            }
        })
        return sorteos
    },
    getSorteoById: (id) => {
        const sorteo = Sorteo.findByPk(id,{
            include:{
                model:Ticket,
                include: {
                    model: User,
                },
            }
        })
        if(!sorteo) throw new Error("No pudimos encontrar el sorteo con el ID "+id)
        return sorteo
    },
    comprarTickets: async (data) => {
        const user = await User.findByPk(data.userId)
        const tickets = data.tickets.map(ticket => {
            return {
                numero: ticket,
                userId: data.userId,
                sorteoId: data.sorteoId
            }
        })
        console.log(user)
        // SI YA SE VENDIERON LOS TICKETS NECESARIO, AGREGARLE FECHA AL SORTEO
        // EL SORTEO DEBE SER EL PRIMER SABADO DESPUÉS DE 45 DIAS
        await Ticket.bulkCreate(tickets)
        sendMailCompra(user.email, data.tickets, data.sorteoId)
        const sorteo = await Sorteo.findByPk(data.sorteoId,{
            include:{
                model:Ticket
            }
        })
        if((sorteo.tickets.length*100)/(sorteo.cantidadTicket*0.6) >= 100){
            const fechaSorteo = getFirstSaturday(30)
            sorteo.fechaSorteo = fechaSorteo
            sorteo.save()
        }
        return "Tickets comprados exitosamente"
    },
    procesarCompraTickets: async (data) => {
        const compra = await Compras.create(data)
        return compra
    },
    buscarTicket: async (id) => {
        const ticket = await Ticket.findByPk(id,{
            include:[{
                model:Sorteo,
                include:[{
                    model:Ganadores,
                    include:[{
                        model:User
                    },{
                        model:Ticket,
                    }]
                }]
            },{
                model:User
            }]
        })
        if(!ticket) throw new Error("No pudimos encontrar el ticket con el ID "+id)
        return ticket
    }
}