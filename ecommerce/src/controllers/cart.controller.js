const cartService = require("../services/cart.service");
const ticketService = require("../services/ticket.service");

module.exports = {
  // GET /api/carts/:cid
  getCartById: async (req, res) => {
    try {
      const cart = await cartService.getCartById(req.params.cid);
      if (!cart)
        return res.status(404).json({ message: "Carrinho não encontrado" });
      res.json(cart);
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
      res.status(500).json({ message: "Erro interno ao buscar carrinho" });
    }
  },

  // POST /api/carts
  createCart: async (req, res) => {
    try {
      const newCart = await cartService.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      console.error("Erro ao criar carrinho:", error);
      res.status(500).json({ message: "Erro interno ao criar carrinho" });
    }
  },

  // PUT /api/carts/:cid/products/:pid
  updateProductQuantity: async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const result = await cartService.updateProductQuantity(
        cid,
        pid,
        quantity
      );
      res.json(result);
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
      res.status(500).json({ message: "Erro interno ao atualizar produto" });
    }
  },

  // DELETE /api/carts/:cid/products/:pid
  removeProductFromCart: async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const result = await cartService.removeProduct(cid, pid);
      res.json(result);
    } catch (error) {
      console.error("Erro ao remover produto do carrinho:", error);
      res.status(500).json({ message: "Erro interno ao remover produto" });
    }
  },

  // DELETE /api/carts/:cid
  clearCart: async (req, res) => {
    try {
      const result = await cartService.clearCart(req.params.cid);
      res.json(result);
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
      res.status(500).json({ message: "Erro interno ao limpar carrinho" });
    }
  },

  // POST /api/carts/:cid/purchase
  purchaseCart: async (req, res) => {
    try {
      const cartId = req.params.cid;
      const userEmail = req.session.user?.email;
      const ticket = await cartService.finalizePurchase(cartId, userEmail);
      res.status(200).json({ status: "success", ticket });
    } catch (error) {
      console.error("Erro na finalização da compra:", error);
      res
        .status(500)
        .json({ status: "error", message: "Erro ao finalizar a compra" });
    }
  },
};
