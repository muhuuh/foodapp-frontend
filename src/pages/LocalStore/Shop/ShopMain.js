// components/Store/ShopMain.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShopBox from "../../../components/Store/Shop/ShopBox";
import { fetchUserProfile } from "../../../store/user-slice";

const ShopMain = () => {
  const dispatch = useDispatch();
  const {
    intro_sentence,
    ingredients: shops,
    loading,
  } = useSelector((state) => state.shops);
  const userId = useSelector((state) => state.users.userId);
  const userProfileLoading = useSelector((state) => state.users.loading);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId]);

  if (loading || userProfileLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <p className="mb-4">{intro_sentence}</p>
      {shops.map((shop, index) => (
        <ShopBox key={index} shop={shop} />
      ))}
    </div>
  );
};

export default ShopMain;
