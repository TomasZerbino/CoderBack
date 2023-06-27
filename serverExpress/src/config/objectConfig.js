const { connect } = require("mongoose");
const dotenv = require("dotenv");
const { commander } = require("../utils/commander");
const { MongoSingleton } = require("../utils/singleton");

const { mode } = commander.opts();

dotenv.config({
  path: mode === "development" ? "./.env.development" : "./.env.production",
});

let url = process.env.MONGO_URL_LOCAL;

module.exports = {
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  connectDB: MongoSingleton.getInstance(),
};
