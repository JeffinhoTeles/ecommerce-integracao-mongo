const { logger } = require("../config/logger");

const loggerMiddleware = (req, res, next) => {
  req.logger = logger;
  next();
};

module.exports = { loggerMiddleware };
