const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../../data/carts.json");

class CartManagerFs {
  constructor() {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
  }

  async getCarts() {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data);
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = {
      id: Date.now().toString(),
      products: [],
    };
    carts.push(newCart);
    await fs.promises.writeFile(filePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((c) => c.id === cartId);
    if (cartIndex === -1) return null;

    const product = carts[cartIndex].products.find(
      (p) => p.product === productId
    );
    if (product) {
      product.quantity++;
    } else {
      carts[cartIndex].products.push({ product: productId, quantity: 1 });
    }

    await fs.promises.writeFile(filePath, JSON.stringify(carts, null, 2));
    return carts[cartIndex];
  }
}

module.exports = CartManagerFs;
