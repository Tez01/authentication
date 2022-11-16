import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";

export default function PrivateRoute({ element: Element, ...rest }) {
  const { currentUser } = useAuthentication();

  // Render the children if user exists, otherwise navigate to login page
  return currentUser ? <Element /> : <Navigate to="/login" />;
}
