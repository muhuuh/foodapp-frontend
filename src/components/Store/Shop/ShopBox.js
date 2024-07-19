// components/Store/ShopBox.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteShop } from "../../../store/user-slice";

const ShopBox = ({ shop }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.users.userProfile);
  const userId = useSelector((state) => state.users.userId);

  const isFavorited =
    userProfile?.favorited?.favorite_shops?.includes(shop.id) || false;

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (!userId) {
      console.error("No user ID found");
      return;
    }
    dispatch(toggleFavoriteShop({ userId, shopId: shop.id }));
  };

  return (
    <div className="border rounded p-4 mb-4 flex justify-between items-center relative">
      <div>
        <h2 className="text-lg font-bold">{shop.store_name}</h2>
        <p>{shop.descriprion}</p>
        <p>
          <strong>Google Stars:</strong> {shop.google_stars}
        </p>
        <p>
          <strong>Favorited:</strong> {shop.favorited}
        </p>
        <p>
          <strong>Keywords:</strong> {shop.keywords.join(", ")}
        </p>
      </div>
      <img
        src={shop.store_image_link}
        alt={shop.store_name}
        className="w-16 h-16 object-cover"
      />
      <button
        onClick={handleFavoriteToggle}
        className={`absolute top-2 right-2 p-1 rounded-full ${
          isFavorited ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
      >
        {isFavorited ? "♥" : "♡"}
      </button>
    </div>
  );
};

export default ShopBox;
