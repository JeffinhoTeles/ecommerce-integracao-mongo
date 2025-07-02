const EErrors = require("../errors/enums");

module.exports = (err, req, res, next) => {
  console.error(`[${err.code}] ${err.message}`);
  switch (err.code) {
    case EErrors.INVALID_PARAM:
      return res.status(400).json({ status: "error", error: err.message });
    default:
      return res
        .status(500)
        .json({ status: "error", error: "Erro inesperado no servidor" });
  }
};
