const { v4: uuidv4 } = require("uuid");
const TicketManagerMongo = require("../dao/db/TicketManagerMongo");

const ticketManager = new TicketManagerMongo();

class TicketService {
  async generateTicket(amount, purchaserEmail) {
    const code = uuidv4(); // gera código único
    const ticket = await ticketManager.createTicket({
      code,
      amount,
      purchaser: purchaserEmail,
    });
    return ticket;
  }
}

module.exports = new TicketService();
