const nodemailer = require("nodemailer");
const { createToken } = require("./jwtHelpers");
const { GMAIL_USER, GMAIL_PASSWORD } = require("../config");
const {
  EMAIL_SECRET,
  FORGOT_PASSWORD_SECRET,
} = require("../config/development");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASSWORD,
  },
});

exports.sendEmailVerification = (userId, userEmail) => {
  createToken(userId, EMAIL_SECRET, undefined, (err, emailToken) => {
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
  createToken(
    userId,
    FORGOT_PASSWORD_SECRET,
    undefined,
    (err, forgotPasswordToken) => {
      if (err) {
        console.log(err);
        return;
      }
      const url = `http://localhost:3000/reset-password/${forgotPasswordToken}`;

      const mailOptions = {
        from: "Tripsy@2021 <noreply@gmail.com>",
        to: userEmail,
        subject: "Reset your password",
        html: `Please click this link to reset your password: <a href="${url}" target="_blank">${url}</a>`,
      };

      transporter.sendMail(mailOptions);
    }
  );
};
