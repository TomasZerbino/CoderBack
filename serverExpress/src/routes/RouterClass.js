const { Router } = require("express");
const jwt = require("jsonwebtoken");
class RouterClass {
  constructor() {
    this.router = Router;
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  applyCallbacks(callbacks) {
    try {
      return callbacks.map((callback) => async (...params) => {
        await callback.apply(this, params);
      });
    } catch (error) {
      console.log(error);
      params[1].status(500).send(error);
    }
  }

  generateCustomResponse = (req, res, next) => {
    res.sendSuccess = (payload) => res.send({ status: "success", payload });
    res.sendServerError = (error) => res.send({ status: "error", error });
    res.sendUserError = (error) => res.send({ status: "error", error });
    next();
  };

  handlePolicies = (policies) => (req, res, next) => {
    if (policies[0] === "PUBLIC") return next();
    const autHeader = req.headers.authorization;
    if (!autHeader)
      return res.send({ status: "error", error: "Not autorized" });

    const token = autHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!policies.includes(user.role.toUpperCase())) {
      return res
        .status(403)
        .send({ status: "success", error: "Not permission" });
    }
    req.user = user;
    next();
  };

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  post() {}

  put() {}

  delete() {}
}

module.exports = RouterClass;
