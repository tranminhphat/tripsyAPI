const jwt = require("jsonwebtoken");
const {
  loginErrorHandler,
  registerErrorHandler,
} = require("../handlers/errorsHandler");
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

const userService = require("../services/userService");

/* Controller for POST: /api/auth/login */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, JWT_SECRET);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    return res.status(200).json({ userId: user._id });
  } catch (err) {
    const error = loginErrorHandler(err);
    return res.status(400).json({ error });
  }
};

/* Controller for POST: /api/auth/register */
exports.register = async (req, res) => {
  const model = req.body;
  try {
    const user = await userService.createUser(model);
    sendEmailVerification(user._id, user.email);
    return res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    const error = registerErrorHandler(err);
    return res.status(400).json({ error });
  }
};

/* Controller for GET: /api/auth/logout */
exports.logout = (_, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    return res.status(200).json();
  } catch (err) {
    return res.status(400).json({
      error: {
        userMessage: "Xảy ra lỗi khi đăng xuất",
        internalMessage: "Login failed",
      },
    });
  }
};

/* Controller for POST: /api/auth/resend-email-verification */
exports.resendEmailVerification = async (req, res) => {
  const { userId, userEmail } = req.body;
  try {
    sendEmailVerification(userId, userEmail);
    return res.status(200).json();
  } catch (err) {
    return res.status(400).json({
      error: {
        userMessage: "Xảy ra lỗi khi gửi email xác nhận",
        internalMessage: "Error occur while sending verification email",
      },
    });
  }
};

/* Controller for GET: /api/auth/verification/token */
exports.verification = async (req, res) => {
  try {
    const { id } = jwt.verify(req.params.token, EMAIL_SECRET);
    await userService.updateUserById(id, { isVerified: true });
    return res.status(200).json({
      userMessage: "Chúc mừng, địa chỉ email của bạn đã được xác nhận",
    });
  } catch (e) {
    return res.status(400).json({
      error: {
        userMessage: "Xảy ra lỗi khi xác thực email",
        internalMessage: "Error occur while verifying email",
      },
    });
  }
};

/* Controller for POST:/api/auth/verification/forgot-password */
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: {
            userMessage: "Tài khoản không tồn tại",
            internalMessage: "User is not existed",
          },
        });
      }

      sendResetPasswordEmail(user._id, user.email);
      return res.status(200).json();
    });
  } catch (e) {
    return res.status(400).json({
      error: {
        userMessage: "Xảy ra lỗi khi gửi email",
        internalMessage: "Error occur while sending reset password email",
      },
    });
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
          return res.status(401).json({
            error: {
              userMessage: "Token không hợp lệ hoặc đã hết hạn",
              internalMessage: "Invalid token or it is expired",
            },
          });
        }

        const { id } = decodedToken;
        await User.findOne({ _id: id }, (error, user) => {
          if (error || !user) {
            return res.status(400).json({
              error: {
                userMessage: "Tài khoản không tồn tại",
                internalMessage: "User is not existed",
              },
            });
          }
          user.password = newPassword;
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: {
                  userMessage: "Xảy ra lỗi khi thay đổi password",
                  internalMessage: "Error occur when changing password",
                },
              });
            }

            return res
              .status(200)
              .json({ userMessage: "Mật khẩu của bạn đã thay đổi thành công" });
          });
        });
      }
    );
  } else {
    return res.status(401).json({ error: "Lỗi xác thực" });
  }
};
