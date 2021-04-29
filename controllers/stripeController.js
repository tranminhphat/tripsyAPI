const activityService = require("../services/activityService");
const experienceService = require("../services/experienceService");
const stripeService = require("../services/stripeService");
const EXPERIENCE_HOSTING_URL = "http://localhost:3000/user/experience-hosting";
const EXPERIENCE_PAGE_URL = "http://localhost:3000/experience";

/*********** Balance ***********/
/* Controller for GET: /api/stripe/balance/:accountId */
exports.getBalanceByAccountId = async (req, res) => {
  const { accountId } = req.params;
  try {
    const balance = await stripeService.getBalanceByAccountId(accountId);
    return res.status(200).json({ balance });
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
};
/*********** Account ***********/
/* Controller for GET: /api/stripe/accounts/:id */
exports.getAccountById = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await stripeService.getAccountById(id);
    return res.status(200).json({ account });
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
};

/* Controller for POST: /api/stripe/accounts */
exports.createAccount = async (_, res) => {
  try {
    const account = await stripeService.createAccount();
    return res.status(200).send(account.id);
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
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
    return res.status(400).json({});
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
    return res.status(400).json({});
  }
};

/* Controller for POST: /api/stripe/checkout-session */
exports.createCheckoutSession = async (req, res) => {
  const { activity, receipt, experience, customer } = req.body.metadata;

  try {
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
      success_url: `${EXPERIENCE_PAGE_URL}/${experience.id}/confirm-booking/response?status=succeed&sessionId={CHECKOUT_SESSION_ID}&receiptId=${receipt.id}&activityId=${activity.id}`,
      cancel_url: `${EXPERIENCE_PAGE_URL}/${experience.id}/confirm-booking/response?status=failed&sessionId=$CHECKOUT_SESSION_ID}&receiptId=${receipt.id}&activityId=${activity.id}`,
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
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
    return res.status(400).json({});
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
    return res.status(400).json({});
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

  const amount = Math.round(
    (experience.pricing.individualPrice * activity.listOfGuestId.length * 0.8) /
      23000
  );

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
    return res.status(400).json({});
  }
};
