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
  gmail_user_app: process.env.GMAIL_USER_APP,
  gmail_pass_app: process.env.GMAIL_PASS_APP,
  twilio_sid: process.env.TWILIO_SID,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
  my_phone: process.env.MY_PHONE,
  connectDB: MongoSingleton.getInstance(),
};
