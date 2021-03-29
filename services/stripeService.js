const stripe = require("stripe")(
  "sk_test_51IXjZvDcrQRGXIG6bRiF2kdXHW7FLUjXAQ8tjMSxuu6QIC8Izi1yxTcVI9MJk3kp45crg80hn8IqbfTreXcSMyLN0014iZUAnk"
);

/********* Account *********/
exports.getAccountById = async (accountId) => {
  return await stripe.accounts.retrieve(accountId);
};

exports.createAccount = async () => {
  return await stripe.accounts.create({
    type: "express",
  });
};

exports.createAccountLink = async (model) => {
  return await stripe.accountLinks.create(model);
};

/********* Checkout *********/
exports.getCheckoutSessionById = async (sessionId) => {
  return await stripe.checkout.sessions.retrieve(sessionId);
};

exports.createCheckoutSession = async (model) => {
  return await stripe.checkout.sessions.create(model);
};
