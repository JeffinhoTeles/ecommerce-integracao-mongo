const express = require("express");
const { createTicket } = require("../controllers/ticket.controller");
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/purchase", authMiddleware, roleMiddleware("admin"), createTicket);

module.exports = router;
