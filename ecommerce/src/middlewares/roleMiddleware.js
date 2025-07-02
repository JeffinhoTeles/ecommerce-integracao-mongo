function roleMiddleware(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res
        .status(403)
        .json({ message: "Acesso negado. Permissão insuficiente." });
    }
    next();
  };
}

module.exports = roleMiddleware;
