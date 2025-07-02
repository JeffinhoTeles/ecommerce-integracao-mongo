const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }, // email do comprador
  },
  { timestamps: true }
);

const TicketModel = mongoose.model("Ticket", ticketSchema);
module.exports = TicketModel;
