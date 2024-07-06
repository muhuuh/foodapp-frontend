import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // or any loading spinner
  }

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
