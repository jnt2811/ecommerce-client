import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

export const AuthProvider = ({ children }) => {
  return (
    <Auth0Provider
      domain="dev-6c1uoj6s.us.auth0.com"
      clientId="yD8tr4KQgMZMqXkTyvE3gd1BW7S4HTKc"
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};
