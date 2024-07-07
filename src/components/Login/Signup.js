import React, { useContext, useState } from "react";
import { AuthContext } from "../../services/supabase/authContext";

const SignUp = () => {
  const { signUp, signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasSpecialChar
    );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage("Invalid email address");
      return;
    }
    if (!validatePassword(password)) {
      setMessage(
        "Password muss mindestens 8 Zeichen lang sein und jeweils mindestens ein Großbuchstaben, eine Zahl und ein Sonderzeichen."
      );
      return;
    }

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
