const passport = require("passport");
const local = require("passport-local");
const { userModel } = require("../models/user.model");
const { createHash, isValidPassword } = require("../utils/bcryptHash");
const GithubStrategy = require("passport-github2");

const LocalStrategy = local.Strategy;

const initPassportLocal = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name } = req.body;
        try {
          let userDB = await userModel.findOne({ email: username });

          if (userDB) return done(null, false);

          let newUser = {
            first_name,
            last_name,
            email: username,
            password: createHash(password),
          };

          let result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findOne({ _id: id });
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const userDB = await userModel.findOne({ email: username });

          if (!userDB) return done(null, false);

          if (!isValidPassword(userDB, password)) return done(null, false);

          return done(null, userDB);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const initPassportGithub = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.f387f2f9fed9b5ce",
        clientSecret: "182a97cc869e5bbaae20e786b6b3806a4cb02d03",
        callbackURL: "http://localhost:8080/session/githubcb",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({ email: profile._json.email });

          if (!user) {
            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              password: "",
            };
            const result = await userModel.create(newUser);
            return done(null, result);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findOne({ _id: id });
    done(null, user);
  });
};

module.exports = {
  initPassportLocal,
  initPassportGithub,
};
