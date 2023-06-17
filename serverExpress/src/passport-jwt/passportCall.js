const passport = require("passport");

// @fix: debe recibir options
const passportCall = (strategy, options) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, options, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({
          status: "error",
          error: info.messages ? info.messages : info.toString(),
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = {
  passportCall,
};