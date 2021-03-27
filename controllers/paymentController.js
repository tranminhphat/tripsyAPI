const stripe = require("stripe")(
  "sk_test_51IXjZvDcrQRGXIG6bRiF2kdXHW7FLUjXAQ8tjMSxuu6QIC8Izi1yxTcVI9MJk3kp45crg80hn8IqbfTreXcSMyLN0014iZUAnk"
);
const YOUR_DOMAIN = "http://localhost:3000/experience/";

/* Controller for GET: api/payment/booking/:id */
exports.getBookingSession = async (req, res) => {
  const { id } = req.params;
  const session = await stripe.checkout.sessions.retrieve(id);
  if (session) {
    return res.status(200).send(session.payment_status);
  }
};

/* Controller for POST: /api/payment/booking */
exports.createBookingSession = async (req, res) => {
  const { receipt, experience, customer } = req.body.metadata;

  const session = await stripe.checkout.sessions.create({
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
    success_url: `${YOUR_DOMAIN}${experience.id}/confirm-booking/success?session_id={CHECKOUT_SESSION_ID}&receipt_id=${receipt.id}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  return res.status(200).json({ id: session.id });
};
