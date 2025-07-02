const express = require("express");
const router = express.Router();

// Rota para testar todos os níveis de log
router.get("/loggerTest", (req, res) => {
  req.logger.debug("🪵 DEBUG: Rastreando detalhes técnicos...");
  req.logger.http("📡 HTTP: Requisição recebida com sucesso.");
  req.logger.info("ℹ️ INFO: Informação geral do sistema.");
  req.logger.warning("⚠️ WARNING: Algo fora do comum detectado.");
  req.logger.error("❌ ERROR: Ocorreu um erro na aplicação.");
  req.logger.fatal("🔥 FATAL: Erro crítico no sistema!");

  res.send(
    "Logs gerados com sucesso! Verifique o console e os arquivos de log."
  );
});

module.exports = router;
