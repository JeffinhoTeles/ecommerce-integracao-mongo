const express = require("express");
const config = require("../config");

let ProductService;
if (config.persistence === "MONGO") {
  ProductService = require("../dao/db/ProductManagerMongo");
} else {
  ProductService = require("../dao/fs/ProductManager");
}

const router = express.Router();
const productManager = new ProductService();

// Buscar produto por ID
router.get("/:pid", async (req, res) => {
  const product = await productManager.getById(req.params.pid);
  if (!product)
    return res.status(404).json({ error: "Produto não encontrado" });
  res.json(product);
});

// Criar novo produto
router.post("/", async (req, res) => {
  const product = await productManager.create(req.body);
  res.status(201).json(product);
});

// Atualizar produto existente
router.put("/:pid", async (req, res) => {
  const updated = await productManager.update(req.params.pid, req.body);
  if (!updated)
    return res.status(404).json({ error: "Produto não encontrado" });
  res.json(updated);
});

// Deletar produto
router.delete("/:pid", async (req, res) => {
  const deleted = await productManager.delete(req.params.pid);
  if (!deleted)
    return res.status(404).json({ error: "Produto não encontrado" });
  res.json({ message: "Produto removido" });
});

module.exports = router;
