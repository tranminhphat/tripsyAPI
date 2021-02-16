const User = require("../models/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { errorsHandler } = require("../handlers/errorsHandler");
const { maxAge, createToken } = require("../helpers/jwtHelpers");
const {
  sendEmailVerification,
  sendResetPasswordEmail,
} = require("../helpers/emailHelpers");
const {
  EMAIL_SECRET,
  JWT_SECRET,
  FORGOT_PASSWORD_SECRET,
} = require("../config/development");

/* Controller for POST: /api/auth/login */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, JWT_SECRET);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({ userId: user._id });
  } catch (err) {
    const errors = errorsHandler(err);
    res.status(400).json({ errors });
  }
};

/* Controller for POST: /api/auth/register */
exports.register = async (req, res) => {
  const { fullName, email, username, password, avatarBase64 } = req.body;
  let userProperties = { fullName, email, username, password };

  try {
    if (avatarBase64) {
      const { data } = await axios.post(
        "http://localhost:2004/api/upload/image",
        {
          data: avatarBase64,
        }
      );
      const avatarUrl = data.imageUrl;
      userProperties = { ...userProperties, avatarUrl };
    }
    const user = await User.create(userProperties);
    sendEmailVerification(user._id, user.email);
    res.status(201).json(user);
  } catch (err) {
    const errors = errorsHandler(err);
    res.status(400).json({ errors });
  }
};

/* Controller for GET: /api/auth/logout */
exports.logout = (_, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).send("redirect to homepage");
  } catch (err) {
    const errors = errorsHandler(err);
    res.status(400).json({ errors });
  }
};

/* Controller for POST: /api/auth/resend-email-verification */
exports.resendEmailVerification = async (req, res) => {
  const { userId, userEmail } = req.body;
  try {
    sendEmailVerification(userId, userEmail);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
};

/* Controller for GET: /api/auth/verification/token */
exports.verification = async (req, res) => {
  try {
    const { id } = jwt.verify(req.params.token, EMAIL_SECRET);
    await User.updateOne({ _id: id }, { isVerified: true });
    res.status(200).send("Chúc mừng, địa chỉ email của bạn đã được xác nhận");
  } catch (e) {
    console.error(e);
  }
};

/* Controller for POST:/api/auth/verification/forgot-password */
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    await User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: "Tài khoản không tồn tại" });
      }

      sendResetPasswordEmail(user._id, user.email);
      res.status(200).send();
    });
  } catch (e) {
    console.error(e);
  }
};

/* Controller for POST:/api/auth/reset-password*/
exports.resetPassword = (req, res) => {
  const { resetPasswordToken, newPassword } = req.body;
  if (resetPasswordToken) {
    jwt.verify(
      resetPasswordToken,
      FORGOT_PASSWORD_SECRET,
      async (err, decodedToken) => {
        if (err) {
          return res
            .status(401)
            .json({ error: "Token không hợp lệ hoặc đã hết hạn" });
        }

        const { id } = decodedToken;
        await User.findOne({ _id: id }, (error, user) => {
          if (error || !user) {
            return res.status(400).json({ error: "Tài khoản không tồn tại" });
          }
          user.password = newPassword;
          user.save((err, result) => {
            if (err) {
              return res
                .status(400)
                .json({ error: "Xảy ra lỗi khi thay đổi password" });
            }

            return res
              .status(200)
              .json({ message: "Mật khẩu của bạn đã thay đổi thành công" });
          });
        });
      }
    );
  } else {
    return res.status(401).json({ error: "Lỗi xác thực" });
  }
};
