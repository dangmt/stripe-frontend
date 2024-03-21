// src/components/PaymentForm.jsx
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useCreatePaymentIntentMutation } from "../services/paymentApi";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [createPaymentIntent, { isLoading, isSuccess, isError, error }] =
    useCreatePaymentIntentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.log("Stripe has not loaded.");
      return;
    }
    console.log(amount);
    const data = await createPaymentIntent({
      amount,
    }).unwrap();
    console.log(data);
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Jenny Rosen",
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment successful!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container p-3">
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="number"
          className="form-control"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <CardElement className="form-control mb-3" />
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
