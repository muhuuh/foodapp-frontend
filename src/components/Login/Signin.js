import React, { useContext, useState } from "react";
import { AuthContext } from "../../services/supabase/authContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { signIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, error } = await signIn(email, password);
    if (error) {
      console.error("Error signing in:", error.message);
      setMessage(error.message);
    } else {
      console.log("User signed in");
      console.log(user);
      if (user) {
        navigate("/main_view");
      }
      setMessage(null);
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signin;
