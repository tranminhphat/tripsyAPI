const stripeService = require("../services/stripeService");
const EXPERIENCE_HOSTING_URL = "http://localhost:3000/user/experience-hosting";
const EXPERIENCE_PAGE_URL = "http://localhost:3000/experience";

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
      refresh_url: EXPERIENCE_HOSTING_URL,
      return_url: EXPERIENCE_HOSTING_URL,
      type: "account_onboarding",
    });
    return res.status(200).send(accountLink.url);
  } catch (err) {
    console.error(err);
  }
};

/*********** Checkout ***********/
/* Controller for GET: api/checkout-session/:id */
exports.getCheckoutSessionById = async (req, res) => {
  const { id } = req.params;
  const session = await stripeService.getCheckoutSessionById(id);
  if (session) {
    return res.status(200).send(session.payment_status);
  }
};

/* Controller for POST: /api/checkout-session */
exports.createCheckoutSession = async (req, res) => {
  const { receipt, experience, customer } = req.body.metadata;

  const session = await stripeService.createCheckoutSession({
    payment_method_types: ["card"],
    mode: "payment",
    client_reference_id: customer.customerId,
    customer_email: customer.customerEmail,
    line_items: [
      {
        price_data: {
          currency: "vnd",
          unit_amount: experience.price,
          product_data: {
            name: experience.name,
            description: experience.description,
            images: [experience.image[0].url],
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${EXPERIENCE_PAGE_URL}/${experience.id}/confirm-booking/response?status=succeed&session_id={CHECKOUT_SESSION_ID}&receipt_id=${receipt.id}`,
    cancel_url: `${EXPERIENCE_PAGE_URL}/${experience.id}/confirm-booking/response?status=cancelled&session_id={CHECKOUT_SESSION_ID}&receipt_id=${receipt.id}`,
  });

  return res.status(200).json({ id: session.id });
};
