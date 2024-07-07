import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUserProfile,
  updateUserProfileLocal,
  updateUserProfileInDB,
} from "../../store/user-slice";

const Settings = () => {
  const dispatch = useDispatch();
  const { userProfile, userId, loading, error } = useSelector(
    (state) => state.users
  );
  const [username, setUsername] = useState(userProfile.username || "");

  console.log("userId");
  console.log(userId);
  console.log(userProfile);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId]);

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
    </div>
  );
};

export default Settings;
