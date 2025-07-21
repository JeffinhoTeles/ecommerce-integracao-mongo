require("dotenv").config();
require("./config/passport.config");

const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
const path = require("path");
const passport = require("passport");

const connectDB = require("./dbConfig");
const config = require("./config");

// Middlewares customizados
const cartSession = require("./middlewares/cartSession");
const { loggerMiddleware } = require("./middlewares/loggerMiddleware");
const errorHandler = require("./middlewares/errorHandler");

// Routers
const authRouter = require("./routes/authRouter");
const productsRouter = require("./routes/productsRouter");
const chatRouter = require("./routes/chatRouter");
const cartsRouter = require("./routes/cartsRouter");
const fsRouter = require("./routes/fsRouter");
const viewsRouter = require("./routes/viewsRouter");
const ticketsRouter = require("./routes/ticketsRouter");
const usersRouter = require("./routes/usersRouter");
const loggerRouter = require("./routes/loggerRouter");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../src/config/swaggerConfig");

const app = express();
const PORT = 8080;

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger deve vir antes das rotas
app.use(loggerMiddleware);

// Sessão
app.use(
  session({
    secret: "seuSegredoUltraSecreto",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware de sessão de carrinho
app.use(cartSession);

// View Engine (Handlebars)
app.engine(
  "handlebars",
  exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "main",
    extname: ".handlebars",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Conexão com o MongoDB (se ativado)
if (config.persistence === "MONGO") connectDB();

// Rotas principais
app.use("/", viewsRouter);
app.use("/api/fs", fsRouter);
app.use("/api/products", productsRouter);
app.use("/chat", chatRouter);
app.use("/api/carts", cartsRouter);
app.use("/", authRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/users", usersRouter);
app.use("/", loggerRouter); // rota de teste para logs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de tratamento de erro
app.use(errorHandler);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
