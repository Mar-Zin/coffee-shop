const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: "mar-zin@mail.ru",
    pass: "jTkjy6VyntG56dqUyjYb",
  },
});

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Email send: ", info);
  });
};

module.exports = mailer;
