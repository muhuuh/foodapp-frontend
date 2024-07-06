import React, { useContext, useState } from "react";
import { AuthContext } from "../../services/supabase/authContext";
import supabase from "../../services/supabase/supabase";

const SignUp = () => {
  const { signUp, signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { user, error } = await signUp(email, password);
    if (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Sign Up Error:", error);
    } else {
      // Immediately sign in the user to ensure they are authenticated
      const { user: signedInUser, error: signInError } = await signIn(
        email,
        password
      );
      if (signInError) {
        setMessage(`Error signing in: ${signInError.message}`);
        console.error("Sign In Error:", signInError);
        return;
      }
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
