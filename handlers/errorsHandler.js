exports.errorsHandler = (err) => {
  let error = {};

  console.log(err);

  /* Handle duplicate field error */
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    error[key] = `${key} has been used`;

    return error;
  }
  /* Handle login errors */
  if (err.message === "Invalid email") {
    error.email = "That email is not registered";

    return error;
  }

  if (err.message === "Invalid password") {
    error.password = "That password is incorrect";

    return error;
  }

  /* Handle register errors */
  Object.values(err.error).forEach(({ properties }) => {
    error[properties.path] = properties.message;
  });

  return error;
};
