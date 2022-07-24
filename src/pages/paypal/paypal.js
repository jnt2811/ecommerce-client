import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { keys } from "../../constants";

const initialOptions = {
  "client-id": keys.PAYPAL_SANDBOX_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  // "data-client-token": "abc123xyz==",
};

export const paypal = () => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons style={{ layout: "horizontal" }} />
    </PayPalScriptProvider>
  );
};
