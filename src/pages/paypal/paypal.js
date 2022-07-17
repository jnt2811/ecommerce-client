import { Col, Row } from "antd";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
    "client-id": "AcYsWy99ZCtgwVYvL9I6_hYbj7Wa6U8haf-cSC0F-DbtWfIPKFaLRFiUaqeH1QjojZwgC0DvmSiQimxS",
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
