const express = require("express");
const routes = require("./routes");
const objectConfig = require("./config/objectConfig.js");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const { socketProduct } = require("./utils/socketProduct");
const {
  initPassportLocal,
  initPassportGithub,
} = require("./config/passport.config");
const passport = require("passport");
const { initPassport } = require("./passport-jwt/passportConfig");

const app = express();

objectConfig.connectDB;

const PORT = process.env.PORT;

const httpServer = app.listen(PORT, () => {
  console.log("aplicacion corriendo en puerto " + PORT);
});

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));

app.use(cookieParser());

initPassportLocal();
initPassportGithub();

initPassport();
passport.use(passport.initialize());

socketProduct(io);

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

routes(app);
