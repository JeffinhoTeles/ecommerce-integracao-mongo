const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const CustomError = require("../errors/CustomError");
const ErrorTypes = require("../errors/ErrorTypes");

// Estratégia de login local
passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(
            new CustomError(
              ErrorTypes.AUTH_ERROR,
              "Usuário não encontrado",
              401
            )
          );
        }

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
          return done(
            new CustomError(ErrorTypes.AUTH_ERROR, "Senha incorreta", 401)
          );
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Estratégia de registro local
passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const exists = await User.findOne({ email });
        if (exists) {
          return done(
            new CustomError(ErrorTypes.AUTH_ERROR, "Usuário já cadastrado", 409)
          );
        }

        const hashed = bcrypt.hashSync(password, 10);
        const user = await User.create({
          ...req.body,
          password: hashed,
        });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Estratégia GitHub
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  console.log("✅ GitHub Strategy configurada.");
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/github/callback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email =
            profile.emails?.[0]?.value || `${profile.username}@github.com`;

          let user = await User.findOne({ email });
          if (!user) {
            user = await User.create({
              name: profile.displayName || profile.username,
              email,
              password: "", // GitHub não exige senha
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
} else {
  console.warn("⚠️ GitHub Strategy não foi registrada: .env incompleto.");
}

// Serialização
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    if (user.email === "adminCoder@coder.com") {
      user.role = "admin";
    } else {
      user.role = "user";
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});
