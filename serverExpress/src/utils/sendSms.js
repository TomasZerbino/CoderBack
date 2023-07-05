const config = require("../config/objectConfig");
const twilio = require("twilio");

const twilio_sid = config.twilio_sid;
const twilio_auth_token = config.twilio_auth_token;
const twilio_phone_number = config.twilio_phone_number;

const cliente = twilio(twilio_sid, twilio_auth_token);

exports.sendSms = () =>
  cliente.messages.create({
    body: "SMS body",
    from: twilio_phone_number,
    to: config.my_phone,
  });
