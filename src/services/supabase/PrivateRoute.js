// services/supabase/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userId } = useSelector((state) => state.users);

  return userId ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
