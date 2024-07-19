// components/Store/ShopBox.js
import React from "react";

const ShopBox = ({ shop }) => {
  return (
    <div className="border rounded p-4 mb-4 flex justify-between items-center">
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
    </div>
  );
};

export default ShopBox;
