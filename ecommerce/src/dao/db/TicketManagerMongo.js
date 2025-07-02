const TicketModel = require("../../models/ticket.model");

class TicketManagerMongo {
  async createTicket(ticketData) {
    return await TicketModel.create(ticketData);
  }

  async getTicketByCode(code) {
    return await TicketModel.findOne({ code });
  }

  async getAllTickets() {
    return await TicketModel.find();
  }
}

module.exports = TicketManagerMongo;
