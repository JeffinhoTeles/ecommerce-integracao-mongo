const express = require("express");
const ProductManagerMongo = require("../dao/db/ProductManagerMongo");
const CartManagerMongo = require("../dao/db/CartManagerMongo");

const router = express.Router();
const productManager = new ProductManagerMongo();
const cartManager = new CartManagerMongo();

// Produtos
router.get("/products", async (req, res) => {
  try {
    const data = await productManager.getPaginatedProducts(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
});

router.post("/products", async (req, res) => {
  try {
    const product = await productManager.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

// Carrinhos
router.post("/carts", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar carrinho" });
  }
});

router.post("/carts/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    if (!updatedCart)
      return res.status(404).json({ error: "Carrinho não encontrado" });
    res.json(updatedCart);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao adicionar produto ao carrinho (Mongo)" });
  }
});

module.exports = router;
