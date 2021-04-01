const activityService = require("../services/activityService");
const experienceService = require("../services/experienceService");
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
/* Controller for GET: api/stripe/checkout-session/:id */
exports.getCheckoutSessionById = async (req, res) => {
  const { id } = req.params;
  try {
    const session = await stripeService.getCheckoutSessionById(id);
    if (session) {
      return res.status(200).json({ session });
    }
  } catch (err) {
    console.error(err);
  }
};

/* Controller for POST: /api/stripe/checkout-session */
exports.createCheckoutSession = async (req, res) => {
  const { activity, receipt, experience, customer } = req.body.metadata;

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
    success_url: `${EXPERIENCE_PAGE_URL}/${experience.id}/confirm-booking/response?status=succeed&session_id={CHECKOUT_SESSION_ID}&receipt_id=${receipt.id}&activity_id=${activity.id}`,
    cancel_url: `${EXPERIENCE_PAGE_URL}/${experience.id}/confirm-booking/response?status=cancelled&session_id={CHECKOUT_SESSION_ID}&receipt_id=${receipt.id}`,
  });

  return res.status(200).json({ id: session.id });
};

/*********** Refund ***********/
/* Controller for GET: /api/stripe/refunds/:id */
exports.getRefundById = async (req, res) => {
  const { id } = req.params;

  try {
    const refund = await stripeService.getRefundById(id);
    if (refund) {
      return res.status(200).send(refund);
    }
  } catch (err) {
    console.error(err);
  }
};

/* Controller for POST: /api/stripe/refunds?payment_intent_id=id*/
exports.createRefund = async (req, res) => {
  const { payment_intent_id } = req.query;

  try {
    const refund = await stripeService.createRefund(payment_intent_id);
    if (refund) {
      return res.status(200).send(refund);
    }
  } catch (err) {
    console.error(err);
  }
};

/* Controller for POST: /api/stripe/transfers/:activityId */
exports.createTransfer = async (req, res) => {
  const { activityId } = req.params;
  const { payoutAccountId } = req.user;

  const activity = await activityService.getActivityById(activityId);
  const experience = await experienceService.getExperienceById(
    activity.experienceId
  );

  if (!activity || !experience || !payoutAccountId) {
    return res.status(404).send();
  }

  const amount =
    (experience.pricing.individualPrice * activity.listOfGuestId.length * 0.8) /
    23000;

  try {
    const transfer = await stripeService.createTransfer(
      payoutAccountId,
      amount.toFixed(2) * 100
    );
    if (transfer) {
      return res.status(200).send(transfer);
    }
  } catch (err) {
    console.error(err);
  }
};
