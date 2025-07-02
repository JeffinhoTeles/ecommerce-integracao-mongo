const express = require("express");
const passport = require("passport");
const CustomError = require("../errors/CustomError");
const ErrorTypes = require("../errors/ErrorTypes");

const router = express.Router();

// Views
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

// Login com passport-local usando callback para tratar erro
router.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return next(
        new CustomError(ErrorTypes.AUTH_ERROR, "Falha na autenticação", 401)
      );
    }

    req.login(user, (err) => {
      if (err) return next(err);

      // Define o role de admin se for o email hardcoded
      if (user.email === "adminCoder@coder.com") {
        user.role = "admin";
      } else {
        user.role = "user";
      }

      return res.redirect("/products");
    });
  })(req, res, next);
});

// Registro com passport-local
router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/register",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/profile")
);

// GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/profile")
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/login"));
});

module.exports = router;
