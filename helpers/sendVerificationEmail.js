const nodemailer = require("nodemailer");
const { createEmailToken } = require("./jwtHelpers");
const { GMAIL_USER, GMAIL_PASSWORD } = require("../config");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASSWORD,
  },
});

exports.sendEmailVerification = (userId, userEmail) => {
  createEmailToken(userId, (err, emailToken) => {
    if (err) {
      console.log(err);
      return;
    }
    const url = `http://localhost:2004/api/auth/verification/${emailToken}`;

    const mailOptions = {
      from: "tripsy2021@gmail.com",
      to: userEmail,
      subject: "Confirm your email",
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    };

    transporter.sendMail(mailOptions);
  });
};
