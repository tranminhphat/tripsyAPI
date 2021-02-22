exports.registerErrorHandler = (err) => {
  let error = {};

  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    error.userMessage = `${key} đã được sử dụng`;
    error.internalMessage = `${key} is duplicate`;

    return error;
  }
};

exports.loginErrorHandler = (err) => {
  let error = {};

  if (err.message === "Invalid user") {
    error.userMessage = "User chưa được đăng ký";
    error.internalMessage = "User is not registered";

    return error;
  }

  if (err.message === "Email is not verified") {
    error.userMessage = "Tài khoản chưa xác nhận email";
    error.internalMessage = "Email is not verified";

    return error;
  }

  if (err.message === "Invalid password") {
    error.userMessage = "Sai mật khẩu";
    error.internalMessage = "Invalid password";

    return error;
  }
};
