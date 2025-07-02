const TicketManagerMongo = require("./db/TicketManagerMongo");

module.exports = {
  ticketManager: new TicketManagerMongo(),
};
