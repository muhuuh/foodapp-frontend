import Signin from "./pages/Login/Signin";
import SignUp from "./pages/Login/Signup";
import ResetPassword from "./components/Login/ResetPassword";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./services/supabase/PrivateRoute";

function App() {
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
