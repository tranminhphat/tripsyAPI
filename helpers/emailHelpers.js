const nodemailer = require("nodemailer");
const { createEmailToken, createForgotPasswordToken } = require("./jwtHelpers");
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
      from: "Tripsy@2021 <noreply@gmail.com>",
      to: userEmail,
      subject: "Confirm your email",
      html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
    };

    transporter.sendMail(mailOptions);
  });
};

exports.sendResetPasswordEmail = (userId, userEmail) => {
  createForgotPasswordToken(userId, (err, forgotPasswordToken) => {
    if (err) {
      console.log(err);
      return;
    }
    const url = `http://localhost:2004/api/auth/reset-password/${forgotPasswordToken}`;

    const mailOptions = {
      from: "Tripsy@2021 <noreply@gmail.com>",
      to: userEmail,
      subject: "Reset your password",
      html: `Please click this link to reset your password: <a href="${url}">${url}</a>`,
    };

    transporter.sendMail(mailOptions);
  });
};
