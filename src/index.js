import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { AppConfig } from "./configs";
import { AppRouter } from "./router";
import "./assets/styles/main.scss";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppConfig>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </AppConfig>
);

reportWebVitals();
