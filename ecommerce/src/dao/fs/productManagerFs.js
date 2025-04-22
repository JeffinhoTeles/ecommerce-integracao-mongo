// src/dao/fs/productManagerFs.js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../../data/products.json");

class ProductManagerFs {
  constructor() {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
  }

  async getProducts() {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === id);
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = {
      id: Date.now().toString(),
      ...product,
    };
    products.push(newProduct);
    await fs.promises.writeFile(filePath, JSON.stringify(products, null, 2));
    return newProduct;
  }
}

module.exports = ProductManagerFs;
