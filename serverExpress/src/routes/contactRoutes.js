const { Router } = require("express");
const { store, index } = require("../controllers/contactController");

const contactRouter = Router();

contactRouter.get("/", index);

contactRouter.post("/", store);

module.exports = contactRouter;
