const { Sorteo, Ticket, User, Ganadores } = require("../db");
const { getYesterdayDate } = require("../helpers/getFirstSaturday");
const { default: axios } = require("axios");
const {
  extraerResultadosLoteria,
} = require("../helpers/extraerResultadosLoteria");
const { sendMailGanador } = require("../helpers/nodeMailer")

const elegirGanadores = async () => {
  const sorteos = await Sorteo.findAll();
  // AQUI DEBO FILTRAR LAS LOTERIAS: BOYACA, CAUCA, PIJAO NOCHE
  const { data: apiSorteo } = await axios.get(
    "https://api-resultadosloterias.com/api/results/2024-11-17"
  );
  const loteriasParaExtraer = ["CULONA NOCHE FESTIVO", "CHONTICO DIA FESTIVO", "CULONA DIA FESTIVO"];
  const resultados = extraerResultadosLoteria(
    loteriasParaExtraer,
    apiSorteo.data
  );
  console.log(resultados);
  const ayer = getYesterdayDate();
  for (let i = 0; i < sorteos.length; i++) {
    if (!sorteos[i].fechaSorteo) continue;
    if (sorteos[i].fechaSorteo == ayer) {
      if (sorteos[i].cantidadTicket == 100) {
        // ASIGNAR SOLO UN GANADOR
        const sorteo = await Sorteo.findByPk(sorteos[i].id, {
            include: {
              model: Ticket,
              include: {
                model: User,
              },
            },
          });
          const cantidadDeNumeros = sorteo.cantidadTicket.toString().length - 1;
  
          // Se extraen los numeros ganadores
          const numeroGanadorUno = resultados[0].result
            .toString()
            .slice(-cantidadDeNumeros)
            .padStart(cantidadDeNumeros, "0");

        console.log(numeroGanadorUno)
  
          // Se colocan los numeros ganadores en la DB
          sorteo.numTicketGanadorP1 = numeroGanadorUno;
          sorteo.save();
  
          // Buscar los usuarios ganadores
          const ganadorUno = sorteo.tickets.find(
            (ticket) =>
              String(ticket.numero).padStart(cantidadDeNumeros, "0") ==
              numeroGanadorUno
          );
  
          // Si hay ganador enviar un correo de alerta
          if (ganadorUno) {
            await Ganadores.create({
              userId: ganadorUno.user.id,
              sorteoId: sorteo.id,
              premioNumero: 1,
              premioEntregado: false,
              ticketId: ganadorUno.id,
            });
            sendMailGanador(ganadorUno.user.email, sorteo.premio1, numeroGanadorUno, "Loteria de Boyacá")
          }
      } else {
        // AQUI DEBO ASIGNAR EL NUMERO GANADOR AL SORTEO
        const sorteo = await Sorteo.findByPk(sorteos[i].id, {
          include: {
            model: Ticket,
            include: {
              model: User,
            },
          },
        });
        const cantidadDeNumeros = sorteo.cantidadTicket.toString().length - 1;

        // Se extraen los numeros ganadores
        const numeroGanadorUno = resultados[0].result
          .toString()
          .slice(-cantidadDeNumeros)
          .padStart(cantidadDeNumeros, "0");
          console.log(numeroGanadorUno)
        const numeroGanadorDos = resultados[1].result
          .toString()
          .slice(-cantidadDeNumeros)
          .padStart(cantidadDeNumeros, "0");
        const numeroGanadorTres = resultados[2].result
          .toString()
          .slice(-cantidadDeNumeros)
          .padStart(cantidadDeNumeros, "0");
        

        // Se colocan los numeros ganadores en la DB
        sorteo.numTicketGanadorP1 = numeroGanadorUno;
        sorteo.numTicketGanadorP2 = numeroGanadorDos;
        sorteo.numTicketGanadorP3 = numeroGanadorTres;
        sorteo.save();

        // Buscar los usuarios ganadores
        const ganadorUno = sorteo.tickets.find(
          (ticket) =>
            String(ticket.numero).padStart(cantidadDeNumeros, "0") ==
            numeroGanadorUno
        );
        const ganadorDos = sorteo.tickets.find(
          (ticket) =>
            String(ticket.numero).padStart(cantidadDeNumeros, "0") ==
            numeroGanadorDos
        );
        const ganadorTres = sorteo.tickets.find(
          (ticket) =>
            String(ticket.numero).padStart(cantidadDeNumeros, "0") ==
            numeroGanadorTres
        );

        // Si hay ganador enviar un correo de alerta
        if (ganadorUno) {
          await Ganadores.create({
            userId: ganadorUno.user.id,
            sorteoId: sorteo.id,
            premioNumero: 1,
            premioEntregado: false,
            ticketId: ganadorUno.id,
          });
          sendMailGanador(ganadorUno.user.email, sorteo.premio1, numeroGanadorUno, "Loteria de Boyacá")
        }
        if (ganadorDos) {
          await Ganadores.create({
            userId: ganadorDos.user.id,
            sorteoId: sorteo.id,
            premioNumero: 2,
            premioEntregado: false,
            ticketId: ganadorDos.id,
          });
        }
        if (ganadorTres) {
          await Ganadores.create({
            userId: ganadorTres.user.id,
            sorteoId: sorteo.id,
            premioNumero: 3,
            premioEntregado: false,
            ticketId: ganadorTres.id,
          });
        }
      }
    }
  }
};

module.exports = {
  elegirGanadores,
};
