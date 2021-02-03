exports.errorsHandler = (err) => {
  let errors = {};

  /* Handle duplicate field error */
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    errors[key] = `${key} has been used`;

    return errors;
  }
  /* Handle login errors */
  if (err.message === "Invalid email") {
    errors.email = "That email is not registered";

    return errors;
  }

  if (err.message === "Invalid password") {
    errors.password = "That password is incorrect";

    return errors;
  }

  /* Handle register errors */
  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};
