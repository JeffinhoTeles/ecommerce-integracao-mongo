const UserService = require("../services/user.service");
const CustomError = require("../errors/CustomError");
const ErrorTypes = require("../errors/ErrorTypes");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError(
        ErrorTypes.AUTH_ERROR,
        "E-mail e senha são obrigatórios",
        400
      );
    }

    const user = await UserService.findByEmail(email);

    if (!user) {
      throw new CustomError(
        ErrorTypes.AUTH_ERROR,
        "Usuário não encontrado",
        401
      );
    }

    const validPassword = await UserService.verifyPassword(user, password);

    if (!validPassword) {
      throw new CustomError(ErrorTypes.AUTH_ERROR, "Senha incorreta", 401);
    }

    req.session.user = user;
    res.status(200).json({ message: "Login efetuado com sucesso" });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
