
import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Context from "../Context/Context";

const stripePromise = loadStripe("pk_test_51Os8E4SEhF2ghQp3XHXBDJU6mg4MgQvqxMyH9zs14Wroo0geX7yNvfQuqwdIjNC3xQk5DUZZUE2b69BXTH9AaGfL00vBl5hq9k");

const Cart = () => {
  const { cart } = useContext(Context); 
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to proceed.");
      return;
    }

    setLoading(true);

    // Calculate the total price
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    try {
      const stripe = await stripePromise;

      // Make a request to the backend to create a payment session
      const response = await fetch("http://localhost:3000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          totalAmount,
        }),
      });

      if (!response.ok) throw new Error("Failed to create payment session");

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 w-full max-w-md mb-4"
            >
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">Price: ${item.price}</p>
              <video
                src={item.videos[0]}
                className="w-full h-40 rounded-lg mt-2"
                controls
              />
            </div>
          ))}

          <button
            onClick={handlePayment}
            className={`mt-6 px-8 py-2 bg-blue-600 text-white font-bold rounded shadow-lg hover:bg-blue-700 transition-all duration-300 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Book Now"}
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
