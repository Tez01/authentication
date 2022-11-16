import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";

export default function PrivateRoute() {
  const { currentUser } = useAuthentication();

  // Render the children if user exists, otherwise navigate to login page
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
