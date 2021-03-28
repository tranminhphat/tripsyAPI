const stripeService = require("../services/stripeService");
const MY_DOMAIN = "http://localhost:3000/user/experience-hosting";

/*********** Account ***********/
/* Controller for GET: /api/stripe/accounts/:id */
exports.getAccountById = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await stripeService.getAccountById(id);
    return res.status(200).json({ account });
  } catch (err) {
    console.error(err);
  }
};

/* Controller for POST: /api/stripe/accounts */
exports.createAccount = async (_, res) => {
  try {
    const account = await stripeService.createAccount();
    return res.status(200).send(account.id);
  } catch (err) {
    console.error(err);
  }
};

/* Controller for POST: /api/stripe/account/:id/link */
exports.createAccountLink = async (req, res) => {
  const { id } = req.params;
  try {
    const accountLink = await stripeService.createAccountLink({
      account: id,
      refresh_url: MY_DOMAIN,
      return_url: MY_DOMAIN,
      type: "account_onboarding",
    });
    return res.status(200).send(accountLink.url);
  } catch (err) {
    console.error(err);
  }
};
