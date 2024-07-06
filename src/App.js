import Signin from "./components/Login/Signin";
import SignUp from "./components/Login/Signup";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./services/supabase/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<Signin />} />
      <Route element={<PrivateRoute />}>
        <Route path="/main_view" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
