import React, { useState } from "react";
import {
  ElementsConsumer,
  CardElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

const CheckoutForm = ({ stripe, elements }) => {
  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     const { stripe, elements } = props;
  //     if (!stripe || !elements) {
  //       return;
  //     }
  //     console.log(props, "propsprops", elements.getElement(CardElement));

  //     const card = elements.getElement(CardElement);
  //     const result = await stripe.createToken(card);

  //     if (result.error) {
  //       console.log(result.error.message, "resultresultresult");
  //     } else {
  //       console.log(result.token, "resultresultresult===>");
  //     }
  //   };
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: name,
      },
    });
    console.log("[PaymentMethod]", payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection setName={setName} />
      <button disabled={!stripe} className="btn-pay">
        Pay Now
      </button>
    </form>
  );
};

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
