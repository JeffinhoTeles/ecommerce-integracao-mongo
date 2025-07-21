const express = require("express");
const CartManager = require("../dao/db/CartManagerMongo");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const cartManager = new CartManager();

/**
 * @swagger
 * tags:
 *   name: Carrinho
 *   description: Rotas para gerenciamento do carrinho
 */

// POST /api/carts → cria um carrinho vazio
router.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

/**
 * @swagger
 * /api/carts/{cid}:
 *   get:
 *     summary: Retorna um carrinho pelo ID
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do carrinho
 *     responses:
 *       200:
 *         description: Carrinho retornado
 */
router.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });
  res.json(cart);
});

/**
 * @swagger
 * /api/carts/{cid}/product/{pid}:
 *   post:
 *     summary: Adiciona um produto ao carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do carrinho
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto adicionado ao carrinho
 */
router.post("/:cid/product/:pid", async (req, res) => {
  const updatedCart = await cartManager.addProductToCart(
    req.params.cid,
    req.params.pid
  );
  if (!updatedCart)
    return res.status(404).json({ error: "Carrinho não encontrado" });
  res.json(updatedCart);
});

router.post("/:cid/purchase", authMiddleware, cartController.purchaseCart);

module.exports = router;
