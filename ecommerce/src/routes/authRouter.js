const express = require("express");
const passport = require("passport");
const router = express.Router();

// Views
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

// Login com passport-local
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    // Define o role de admin se for o email hardcoded
    if (req.user.email === "adminCoder@coder.com") {
      req.user.role = "admin";
    } else {
      req.user.role = "user";
    }
    res.redirect("/products");
  }
);

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
