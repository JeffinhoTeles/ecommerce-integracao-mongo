const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../../data/products.json");

class ProductManagerFs {
  constructor() {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
  }

  async getAll() {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data);
  }

  async getById(id) {
    const products = await this.getAll();
    return products.find((p) => p.id === id);
  }

  async create(product) {
    const products = await this.getAll();
    const newProduct = {
      id: Date.now().toString(),
      ...product,
    };
    products.push(newProduct);
    await fs.promises.writeFile(filePath, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async update(id, data) {
    const products = await this.getAll();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...data };
    await fs.promises.writeFile(filePath, JSON.stringify(products, null, 2));
    return products[index];
  }

  async delete(id) {
    const products = await this.getAll();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return null;

    await fs.promises.writeFile(filePath, JSON.stringify(filtered, null, 2));
    return true;
  }
}

module.exports = ProductManagerFs;
