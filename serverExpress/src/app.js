const express = require("express");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "public"));

routes(app);

app.listen(8080, () => {
  console.log("aplicacion corriendo en puerto 8080");
});
