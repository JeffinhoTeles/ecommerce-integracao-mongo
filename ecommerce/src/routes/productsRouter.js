const express = require("express");

// Força uso do Mongo (já que não tem config/index.js)
const ProductManagerMongo = require("../dao/db/ProductManagerMongo");
// ou
// const ProductManagerFs = require("../dao/fs/ProductManagerFs");

const CustomError = require("../errors/CustomError");
const ErrorTypes = require("../errors/ErrorTypes");

const router = express.Router();
const productManager = new ProductManagerMongo(); // ou new ProductManagerFs()

// Buscar produto por ID
router.get("/:pid", async (req, res, next) => {
  try {
    const product = await productManager.getById(req.params.pid);
    if (!product) {
      throw new CustomError(
        ErrorTypes.INVALID_PARAM,
        "Produto não encontrado",
        404
      );
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Criar novo produto
router.post("/", async (req, res, next) => {
  try {
    const product = await productManager.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

// Atualizar produto
router.put("/:pid", async (req, res, next) => {
  try {
    const updated = await productManager.update(req.params.pid, req.body);
    if (!updated) {
      throw new CustomError(
        ErrorTypes.INVALID_PARAM,
        "Produto não encontrado para atualizar",
        404
      );
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Deletar produto
router.delete("/:pid", async (req, res, next) => {
  try {
    const deleted = await productManager.delete(req.params.pid);
    if (!deleted) {
      throw new CustomError(
        ErrorTypes.INVALID_PARAM,
        "Produto não encontrado para deletar",
        404
      );
    }
    res.json({ message: "Produto removido com sucesso" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
