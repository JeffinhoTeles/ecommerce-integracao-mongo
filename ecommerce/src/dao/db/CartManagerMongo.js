const CartModel = require("../../models/cart.model");

class CartManagerMongo {
  async getCartWithProducts(cartId) {
    return await CartModel.findById(cartId).populate("products.product");
  }

  async updateCartQuantity(cid, pid, quantity) {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;
    const product = cart.products.find((p) => p.product.toString() === pid);
    if (product) {
      product.quantity = quantity;
      await cart.save();
    }
    return cart;
  }

  async emptyCart(cartId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;
    cart.products = [];
    await cart.save();
    return cart;
  }

  async updateCart(cid, newProducts) {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;
    cart.products = newProducts;
    await cart.save();
    return cart;
  }

  async addProductToCart(cid, pid) {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;

    const existingProduct = cart.products.find(
      (p) => p.product.toString() === pid
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    return cart;
  }
}

module.exports = CartManagerMongo;
