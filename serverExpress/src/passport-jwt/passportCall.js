const passport = require("passport");

const passportCall = (strategy, options) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, options, function (err, user, info) {
      if (err) return next(err);

      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(401).send({
          status: "error",
          error: info.messages ? info.messages : info.toString(),
        });
      }
    })(req, res, next);
  };
};

module.exports = {
  passportCall,
};
