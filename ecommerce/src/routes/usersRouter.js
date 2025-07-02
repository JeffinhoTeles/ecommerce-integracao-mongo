const { Router } = require("express");
const CustomError = require("../errors/CustomError");
const EErrors = require("../errors/enums");
const { generateUserParamErrorInfo } = require("../errors/info");

const router = Router();

router.get("/:uid", (req, res, next) => {
  const uid = req.params.uid;

  if (!uid || isNaN(uid) || Number(uid) < 0) {
    return CustomError.createError({
      name: "UserParamError",
      cause: `Parâmetro inválido: ${uid}`,
      cause: generateUserParamErrorInfo(uid),
      message: "O parâmetro UID deve ser um número válido e positivo",
      code: EErrors.INVALID_PARAM,
    });
  }

  res.json({ message: `Usuário com ID ${uid} seria retornado.` });
});

module.exports = router;
