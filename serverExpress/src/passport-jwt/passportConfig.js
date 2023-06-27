const passport = require("passport");
const jwt = require("passport-jwt");
const objectConfig = require("../config/objectConfig");

const JWTStrategy = jwt.Strategy;

const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"];
  }
  return token;
};

const initPassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: objectConfig.jwtSecretKey,
      },
      async (jwt_payload, donde) => {
        try {
          return donde(null, jwt_payload);
        } catch (error) {
          return donde(error);
        }
      }
    )
  );
};

module.exports = {
  initPassport,
};
