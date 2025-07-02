const ticketService = require("../services/ticket.service");

const createTicket = async (req, res) => {
  try {
    const { amount } = req.body;
    const purchaserEmail = req.user?.email || "desconhecido@email.com";

    const ticket = await ticketService.generateTicket(amount, purchaserEmail);
    res.status(201).json({ status: "success", payload: ticket });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = { createTicket };
