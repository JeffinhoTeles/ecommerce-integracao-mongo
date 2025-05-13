require("dotenv").config();
require("./config/passport.config"); // carregar estratégias ANTES de usar

const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");

const connectDB = require("./dbConfig");
const config = require("./config");
const cartSession = require("./middlewares/cartSession");
const authRouter = require("./routes/authRouter");

const productsRouter = require("./routes/productsRouter");
const chatRouter = require("./routes/chatRouter");
const cartsRouter = require("./routes/cartsRouter");
const fsRouter = require("./routes/fsRouter");
const viewsRouter = require("./routes/viewsRouter");
const passport = require("passport");

const app = express(); // ✅ TEM QUE VIR ANTES de app.use()

const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Views
app.engine(
  "handlebars",
  exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Conexão Mongo
if (config.persistence === "MONGO") connectDB();

// Rotas
app.use("/", viewsRouter);
app.use("/api/fs", fsRouter);
app.use("/api/products", productsRouter);
app.use("/chat", chatRouter);
app.use("/api/carts", cartsRouter);
app.use("/", authRouter);

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
