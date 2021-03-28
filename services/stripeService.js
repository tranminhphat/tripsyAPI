const stripe = require("stripe")(
  "sk_test_51IXjZvDcrQRGXIG6bRiF2kdXHW7FLUjXAQ8tjMSxuu6QIC8Izi1yxTcVI9MJk3kp45crg80hn8IqbfTreXcSMyLN0014iZUAnk"
);

/********* Account *********/
/* Get account */
exports.getAccountById = async (accountId) => {
  return await stripe.accounts.retrieve(accountId);
};

/* Create an Express account */
exports.createAccount = async () => {
  return await stripe.accounts.create({
    type: "express",
  });
};

/* Create an account link */
exports.createAccountLink = async (model) => {
  return await stripe.accountLinks.create(model);
};
