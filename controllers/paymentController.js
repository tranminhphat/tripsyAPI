const stripe = require("stripe")(
  "sk_test_51IXjZvDcrQRGXIG6bRiF2kdXHW7FLUjXAQ8tjMSxuu6QIC8Izi1yxTcVI9MJk3kp45crg80hn8IqbfTreXcSMyLN0014iZUAnk"
);
const YOUR_DOMAIN = "http://localhost:3000";

/* Controller for POST: /api/payment/create-booking-session */
exports.createBookingSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "vnd",
          product_data: {
            name: "Stubborn Attachments",
          },
          unit_amount: 20000000,
        },
        quantity: 1,
      },
    ],
    success_url: `${YOUR_DOMAIN}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  return res.status(200).json({ id: session.id });
};
