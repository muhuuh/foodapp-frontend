// components/Store/ShopMain.js
import React from "react";
import { useSelector } from "react-redux";
import ShopBox from "../../../components/Store/Shop/ShopBox";

const ShopMain = () => {
  const {
    intro_sentence,
    ingredients: shops,
    loading,
  } = useSelector((state) => state.shops);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <p className="mb-4">{intro_sentence}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        shops.map((shop, index) => <ShopBox key={index} shop={shop} />)
      )}
    </div>
  );
};

export default ShopMain;
