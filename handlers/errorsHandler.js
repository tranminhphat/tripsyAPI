exports.errorsHandler = (err) => {
  let error = {};

  console.log(err);

  /* Handle duplicate field error */
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    error[key] = `${key} đã được sử dụng`;

    return error;
  }
  /* Handle login errors */
  if (err.message === "Invalid email") {
    error.email = "Email chưa được đăng ký";

    return error;
  }

  if (err.message === "Invalid password") {
    error.password = "Sai mật khẩu";

    return error;
  }

  /* Handle register errors */
  Object.values(err.error).forEach(({ properties }) => {
    error[properties.path] = properties.message;
  });

  return error;
};
