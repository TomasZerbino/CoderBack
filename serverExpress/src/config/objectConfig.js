const { connect } = require("mongoose");

let url = "mongodb+srv://tomaszerbino:tomaszr@coderback.fqqi5e9.mongodb.net/";

module.exports = {
  connectDB: () => {
    connect(url);
    console.log("DB conectada");
  },
};