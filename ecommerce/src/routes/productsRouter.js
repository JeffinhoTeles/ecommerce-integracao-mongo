const express = require("express");

// Força uso do Mongo (já que não tem config/index.js)
const ProductManagerMongo = require("../dao/db/ProductManagerMongo");
const CustomError = require("../errors/CustomError");
const ErrorTypes = require("../errors/ErrorTypes");

const router = express.Router();
const productManager = new ProductManagerMongo();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Rotas para gerenciamento de produtos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get("/", async (req, res, next) => {
  try {
    const products = await productManager.getAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               code:
 *                 type: string
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado
 */
router.post("/", async (req, res, next) => {
  try {
    const product = await productManager.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

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
