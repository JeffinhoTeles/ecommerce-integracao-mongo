const winston = require("winston");

const customLevels = {
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
  },
  colors: {
    debug: "blue",
    http: "green",
    info: "white",
    warning: "yellow",
    error: "red",
    fatal: "magenta",
  },
};

winston.addColors(customLevels.colors);

const devLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [new winston.transports.Console({ level: "debug" })],
});

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "errors.log", level: "error" }),
  ],
});

const logger = process.env.NODE_ENV === "production" ? prodLogger : devLogger;

module.exports = { logger };
