const ProductModel = require("../models/product.model");

class ProductManagerMongo {
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

    // Formatando pra usar direto no Handlebars
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
