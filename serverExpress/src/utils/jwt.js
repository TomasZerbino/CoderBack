const jwt = require("jsonwebtoken");
const JWT_PRIVATE_KEY = "frasesecreta";

const generateToken = (user) => {
  const token = jwt.sign({ user }, JWT_PRIVATE_KEY, { expiresIn: "1d" });
  return token;
};

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.send("no autenticado");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_PRIVATE_KEY, (error, credential) => {
    if (error)
      return res.status(403).send({
        status: "error",
        error: "No autorizado",
      });
    req.user = credential.user;
    next();
  });
};

module.exports = {
  generateToken,
  authToken,
};
