const CartModel = require("../models/cart.model");

async function cartSession(req, res, next) {
  if (!req.session.cartId) {
    const newCart = await CartModel.create({ products: [] });
    req.session.cartId = newCart._id;
  } else {
  }

  res.locals.cartId = req.session.cartId;
  next();
}

module.exports = cartSession;
