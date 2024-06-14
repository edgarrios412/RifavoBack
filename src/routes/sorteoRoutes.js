const { Router } = require("express");
const sorteoRoutes = Router();
const {
  getSorteos,
  getSorteoById,
  comprarTickets,
  buscarTicket,
} = require("../controllers/sorteoController");

sorteoRoutes.get("/listar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id == "all") {
      const sorteos = await getSorteos();
      res.json(sorteos);
    } else {
      const sorteo = await getSorteoById(id);
      res.json(sorteo);
    }
  } catch (error) {
    console.log(error);
  }
});

sorteoRoutes.post("/comprar/tickets", async (req, res) => {
  try {
      const tickets = await comprarTickets(req.body);
      res.json(tickets);
  } catch (error) {
    console.log(error);
  }
});

sorteoRoutes.get("/buscar/ticket/:id", async (req, res) => {
  try {
      const tickets = await buscarTicket(req.params.id);
      res.json(tickets);
  } catch (error) {
    console.log(error);
  }
});

module.exports = sorteoRoutes;
