import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../../services/supabase/supabase";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const search = useLocation().search;
  const accessToken = new URLSearchParams(search).get("access_token");

  const resetPassword = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmed) {
      setMessage("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password }, accessToken);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password has been updated");
      navigate("/main_view");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-center bg-cover parallax px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
            Reset your password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={resetPassword}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="passwordConfirm" className="sr-only text-sm">
                Confirm Password
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none text-sm rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm new password"
                value={passwordConfirmed}
                onChange={(e) => setPasswordConfirmed(e.target.value)}
              />
            </div>
          </div>

          <div className="">
            <button
              type="submit"
              className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-limeGreen hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </div>
          {message && <p className="text-center text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
