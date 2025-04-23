const express = require("express");
const ProductManagerMongo = require("../dao/db/ProductManagerMongo");
const CartManagerMongo = require("../dao/db/CartManagerMongo");
const CartModel = require("../dao/models/cart.model");

const router = express.Router();
const productManagerMongo = new ProductManagerMongo();
const cartManager = new CartManagerMongo();

router.get("/products", async (req, res) => {
  try {
    const data = await productManagerMongo.getPaginatedProducts(req.query);

    console.log("🔁 Enviando para view cartId:", req.session.cartId);

    res.render("products", {
      ...(data || {}),
      cartId: req.session.cartId,
      payload: (data.payload || []).map((p) => ({
        ...p,
        cartId: req.session.cartId,
      })),
    });
  } catch (err) {
    console.error("❌ Erro ao carregar /products:", err);
    res.status(500).send("Erro ao carregar a página de produtos");
  }
});

router.get("/cart", async (req, res) => {
  try {
    const cartId = req.session.cartId;
    const cart = await cartManager.getCartWithProducts(cartId);

    if (!cart) {
      return res.status(404).send("Carrinho não encontrado");
    }

    res.render("cart", {
      cart,
    });
  } catch (err) {
    console.error("Erro ao carregar o carrinho:", err);
    res.status(500).send("Erro ao carregar o carrinho");
  }
});

// Finalizar compra
router.post("/cart/purchase", async (req, res) => {
  try {
    const cartId = req.session.cartId;
    const cart = await CartModel.findById(cartId).populate("products.product");

    if (!cart) {
      return res.status(404).send("Carrinho não encontrado");
    }

    const total = cart.products.reduce((sum, item) => {
      return sum + item.quantity * (item.product.price || 0);
    }, 0);

    cart.products = [];
    await cart.save();

    res.render("purchase", {
      total,
      title: "Compra finalizada com sucesso!",
    });
  } catch (err) {
    console.error("Erro ao finalizar compra:", err);
    res.status(500).send("Erro ao finalizar compra");
  }
});

module.exports = router;
