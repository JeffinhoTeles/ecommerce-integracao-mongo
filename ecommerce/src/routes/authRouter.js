const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model"); // vamos criar esse model já já

// View de login
router.get("/login", (req, res) => {
  res.render("login");
});

// View de registro
router.get("/register", (req, res) => {
  res.render("register");
});

// Processa login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Admin hardcoded
  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    req.session.user = {
      name: "Administrador",
      email,
      role: "admin",
    };
    return res.redirect("/products");
  }

  // Procura usuário comum
  const user = await UserModel.findOne({ email, password });
  if (!user) return res.redirect("/login");

  req.session.user = {
    name: user.name,
    email: user.email,
    role: "user",
  };

  res.redirect("/products");
});

// Processa registro
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await UserModel.findOne({ email });
  if (exists) return res.redirect("/register");

  await UserModel.create({ name, email, password });
  res.redirect("/login");
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Erro ao sair");
    res.redirect("/login");
  });
});

module.exports = router;
