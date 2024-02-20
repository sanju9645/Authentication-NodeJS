
require('dotenv').config();

const nodemailer = require('nodemailer');

//SMTP 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  }
});

transporter.verify((err, success) => {
  if (err) {
    console.error(err);
  } else {
    console.log("E-Raven is ready for messages");
    console.log(success);
  }
});

const sendRaven = async ({to, subject, body, html}) => {
  const mailOptions = {
    from    : process.env.AUTH_EMAIL,
    to      : to,
    subject : subject,
  };

  if (body) {
    mailOptions.text = body;
  }

  if (html) {
    mailOptions.html = html;
  }

  transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log("Mail sent successfully");
    })
    .catch((err) => {
      console.error("E-Raven Error " + err);
    });
} 

module.exports = {
  sendRaven
}
