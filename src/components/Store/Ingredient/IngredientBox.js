import React from "react";

const IngredientBox = ({ ingredient, onClick }) => {
  return (
    <div
      className="border rounded p-4 mb-4 flex justify-between items-center cursor-pointer"
      onClick={onClick}
    >
      <div>
        <h2 className="text-lg font-bold">{ingredient.general_name}</h2>
        <p>{ingredient.store_id} Verkäufer</p>
        <p>
          {ingredient.price}€ / {ingredient.pack_size}
        </p>
      </div>
      <img
        src={ingredient.ingredient_image}
        alt={ingredient.general_name}
        className="w-16 h-16 object-cover"
      />
    </div>
  );
};

export default IngredientBox;
