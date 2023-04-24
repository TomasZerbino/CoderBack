const express = require("express");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const { socketProduct } = require("./utils/socketProduct");

const app = express();

const httpServer = app.listen(8080, () => {
  console.log("aplicacion corriendo en puerto 8080");
});

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use(cookieParser());

// app.get("/home", (req, res) => {
//   res.render("home", {});
// });

socketProduct(io);

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

routes(app);
