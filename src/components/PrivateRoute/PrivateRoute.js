import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login/" />;
}

export default PrivateRoute;
