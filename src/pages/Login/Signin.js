import React, { useContext, useState } from "react";
import { AuthContext } from "../../services/supabase/authContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const { signIn } = useContext(AuthContext);
  const { passwordRecovery } = useContext(AuthContext);

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
        navigate("/ingredient_search");
      }
      setMessage(null);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    console.log("resetEmail");
    console.log(resetEmail);
    const { error } = await passwordRecovery(resetEmail);
    if (error) {
      console.error("Error resetting password:", error.message);
    } else {
      console.log("Password reset link sent");
    }
    closeModal();
  };

  //----------------------- handle modal ---------------------

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
      <div className="inline-block align-bottom bg-gray-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Passwort vergessen
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 font-light">
                  Gebe deine Email ein und wir werden dir ein Link senden um ein
                  neues Passwort erzustellen.
                </p>
                <input
                  type="email"
                  placeholder="Email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="font-light text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-limeGreen text-base font-medium text-gray-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handlePasswordReset}
          >
            Sende Link
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={closeModal}
          >
            Zurück
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
