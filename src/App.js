import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "./services/supabase/supabase";
import Signin from "./pages/Login/Signin";
import SignUp from "./pages/Login/Signup";
import ResetPassword from "./components/Login/ResetPassword";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./services/supabase/PrivateRoute";

import { fetchUserProfile, setUserId } from "./store/user-slice";

function App() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.users);

  //------------------- handle signing in/out and getting user ID ----------------
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        dispatch(setUserId(session.user.id));
      }
    };
    getSession();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        dispatch(setUserId(session.user.id));
      } else if (event === "SIGNED_OUT") {
        dispatch(setUserId(null));
      }
    });
  }, [dispatch]);

  //------------------ fetch user profil -----------------
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId]);

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/reset_password" element={<ResetPassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/main_view" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
