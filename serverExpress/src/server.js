const express = require("express");
const routes = require("./routes");
const objectConfig = require("./config/objectConfig.js");
const session = require("express-session");
const FileSstore = require("session-file-store");
const { create } = require("connect-mongo");
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

objectConfig.connectDB();

const httpServer = app.listen(8080, () => {
  console.log("aplicacion corriendo en puerto 8080");
});

const io = new Server(httpServer);

const fileStore = FileSstore(session);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
// app.use(
//   session({
//     store: create({
//       mongoUrl:
//         "mongodb+srv://tomaszerbino:tomaszr@coderback.fqqi5e9.mongodb.net/backCoder",
//       mongoOptions: {
//         useNewUrlParser: true,
//       },
//       ttl: 100000 * 33,
//     }),
//     secret: "secretw",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
app.use(cookieParser());

// @fix: Se deben incluir las estrategias ya desarrolladas; para permitir el login local y por github
initPassportLocal();
initPassportGithub();
// @fix: Es correcto, pero funciona solo para JWT, faltan las estrategias anteriores
initPassport();
passport.use(passport.initialize());
// passport.use(passport.session());

socketProduct(io);

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

routes(app);
