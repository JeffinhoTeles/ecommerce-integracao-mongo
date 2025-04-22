// src/routes/fsRouter.js
const express = require("express");
const ProductManagerFs = require("../dao/fs/productManagerFs");
const CartManagerFs = require("../dao/fs/cartManagerFs");

const router = express.Router();
const productManager = new ProductManagerFs();
const cartManager = new CartManagerFs();

// Produtos
router.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
});

router.post("/products", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

// Carrinhos
router.post("/carts", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar carrinho" });
  }
});

router.post("/carts/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.addToCart(cid, pid);
    if (!updatedCart)
      return res.status(404).json({ error: "Carrinho não encontrado" });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar produto ao carrinho" });
  }
});

module.exports = router;
