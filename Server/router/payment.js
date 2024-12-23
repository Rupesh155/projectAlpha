const express = require("express");
const stripe = require('stripe')('sk_test_51Os8E4SEhF2ghQp3hf7N5NJAQn2DceXv7fuYaVIPtkP97tOxwXPbg1Fe9enZfhx4Px5XirD0v7aFrb4iS8SMxHC200z1EES8ji');

const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: 'book',
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
