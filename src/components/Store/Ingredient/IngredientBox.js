// components/Store/Ingredient/IngredientBox.js
import React from "react";
import IngredientDetail from "./IngredientDetail";

const IngredientBox = ({ ingredient, onClick, isSelected }) => {
  const count = ingredient.count || 1; // Default count to 1 if it doesn't exist
  const pricePerKg = (ingredient.standardised_price / count).toFixed(2);

  return (
    <div>
      <div
        className="border rounded p-4 mb-4 flex justify-between items-center cursor-pointer"
        onClick={onClick}
      >
        <div>
          <h2 className="text-lg font-bold">{ingredient.general_name}</h2>
          <p>{count} Verkäufer</p>
          <p>{pricePerKg}€ / kg</p>
        </div>
        <img
          src={ingredient.ingredient_image}
          alt={ingredient.general_name}
          className="w-16 h-16 object-cover"
        />
      </div>
      {isSelected && (
        <IngredientDetail general_name={ingredient.general_name} />
      )}
    </div>
  );
};

export default IngredientBox;
