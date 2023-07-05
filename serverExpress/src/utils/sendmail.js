const nodemailer = require("nodemailer");
const config = require("../config/objectConfig");

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmail_user_app,
    pass: config.gmail_pass_app,
  },
});

exports.sendMail = async (to, html, subject) => {
  return await transport.sendMail({
    from: "Coder Test <tomaszerbino@gmail.com>",
    to,
    subject: "Test",
    html: `<div>
            <h1>Test</h1>
        </div>`,
    // attachments:[{
    //     filename: "",
    //     path: __dirname + "",
    //     cid:"ref"
    // }]
  });
};
