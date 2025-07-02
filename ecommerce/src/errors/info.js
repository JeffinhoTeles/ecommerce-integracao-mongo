exports.generateUserParamErrorInfo = (uid) => {
  return `O parâmetro fornecido [uid=${uid}] é inválido.
  Esperado: número inteiro positivo.
  Recebido: ${
    uid === undefined
      ? "undefined"
      : typeof uid === "string" && uid.trim() === ""
      ? "vazio"
      : uid
  }`;
};
