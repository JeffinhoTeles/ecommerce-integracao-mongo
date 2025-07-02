const CartManagerMongo = require("../dao/db/CartManagerMongo");
const ProductManagerMongo = require("../dao/db/ProductManagerMongo");
const TicketService = require("./ticket.service");

const cartManager = new CartManagerMongo();
const productManager = new ProductManagerMongo();

class CartService {
  async getCartById(cid) {
    return await cartManager.getCartWithProducts(cid);
  }

  async createCart() {
    return await cartManager.createCart();
  }

  async updateProductQuantity(cid, pid, quantity) {
    return await cartManager.updateProductQuantity(cid, pid, quantity);
  }

  async removeProduct(cid, pid) {
    return await cartManager.removeProductFromCart(cid, pid);
  }

  async clearCart(cid) {
    return await cartManager.clearCart(cid);
  }

  async finalizePurchase(cid, purchaserEmail) {
    const cart = await cartManager.getCartWithProducts(cid);
    if (!cart) throw new Error("Carrinho não encontrado");

    const availableProducts = [];
    const unavailableProducts = [];

    for (const item of cart.products) {
      const product = await productManager.getById(item.product._id);
      if (product && product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await productManager.update(product._id, product);
        availableProducts.push(item);
      } else {
        unavailableProducts.push(item);
      }
    }

    const amount = availableProducts.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    const ticket = await TicketService.generateTicket(amount, purchaserEmail);

    // Atualiza o carrinho com os produtos que **não** foram comprados
    cart.products = unavailableProducts;
    await cart.save();

    return ticket;
  }
}

module.exports = new CartService();
