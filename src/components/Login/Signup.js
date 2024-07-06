// src/components/SignUp.js
import React, { useContext, useState } from "react";
import { AuthContext } from "../../services/supabase/authContext";

const SignUp = () => {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await signUp(email, password);
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage(
        "Sign-up successful! Please check your email to confirm your account."
      );
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
