const ProductService = require("../services/product.service");
const CustomError = require("../errors/CustomError");
const ErrorTypes = require("../errors/ErrorTypes");

const getProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;

    if (!pid || typeof pid !== "string") {
      throw new CustomError(
        ErrorTypes.INVALID_PARAM,
        "ID do produto inválido",
        400
      );
    }

    const product = await ProductService.getById(pid);

    if (!product) {
      throw new CustomError(
        ErrorTypes.INVALID_PARAM,
        "Produto não encontrado",
        404
      );
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductById,
};
