const config = require("../config/development");
const stripe = require("stripe")(config.STRIPE_SK_TEST);

/********* Balance *********/
exports.getBalanceByAccountId = async (accountId) => {
  return await stripe.balance.retrieve({
    stripeAccount: accountId,
  });
};

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

/********* Refund *********/
exports.getRefundById = async (refundId) => {
  return await stripe.refunds.retrieve(refundId);
};

exports.createRefund = async (paymentIntentId) => {
  return await stripe.refunds.create({
    payment_intent: paymentIntentId,
  });
};

/********* Transfer *********/
exports.createTransfer = async (destination, amount) => {
  return await stripe.transfers.create({
    currency: "usd",
    amount,
    destination,
  });
};

/********* Transaction *********/
exports.getTransactions = async (limit) => {
  if (!limit) {
    return await stripe.paymentIntents.list({ limit });
  }
  return await stripe.paymentIntents.list();
};
