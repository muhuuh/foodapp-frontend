import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../services/supabase/authContext";

import {
  updateUserProfileLocal,
  updateUserProfileInDB,
} from "../../store/user-slice";

const Settings = () => {
  const dispatch = useDispatch();
  const { userProfile, userId, loading } = useSelector((state) => state.users);
  const [username, setUsername] = useState(userProfile.username || "");
  const { signOut } = useContext(AuthContext);

  //------------log out --------------

  //-------------Update profil info -------------

  useEffect(() => {
    if (userProfile.username) {
      setUsername(userProfile.username);
    }
  }, [userProfile]);

  const handleUpdate = () => {
    dispatch(updateUserProfileLocal({ username }));
    dispatch(updateUserProfileInDB({ id: userId, username }));
  };

  return (
    <div>
      <h1>User Profile</h1>
      {loading && <p>Loading...</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Settings;
