const ProductModel = require("../../models/product.model");

class ProductManagerMongo {
  async getAll() {
    return ProductModel.find().lean();
  }

  async getById(id) {
    return ProductModel.findById(id).lean();
  }

  async create(data) {
    return ProductModel.create(data);
  }

  async update(id, data) {
    return ProductModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async delete(id) {
    const deleted = await ProductModel.findByIdAndDelete(id);
    return deleted ? true : null;
  }
  async getPaginatedProducts({ limit = 10, page = 1, sort, query }) {
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      lean: true,
    };

    if (sort) {
      options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    const filter = query
      ? {
          $or: [
            { category: { $regex: query, $options: "i" } },
            { title: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const result = await ProductModel.paginate(filter, options);

    return {
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
    };
  }
}

module.exports = ProductManagerMongo;
