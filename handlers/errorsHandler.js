exports.errorsHandler = (err) => {
  let errors = {};

  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    errors[key] = `${key} has been used`;

    return errors;
  }

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};
