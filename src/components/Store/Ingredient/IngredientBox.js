import React from "react";
import IngredientDetail from "./IngredientDetail";

const IngredientBox = ({ ingredient, onClick, isSelected }) => {
  return (
    <div>
      <div
        className="border rounded p-4 mb-4 flex justify-between items-center cursor-pointer"
        onClick={onClick}
      >
        <div>
          <h2 className="text-lg font-bold">{ingredient.general_name}</h2>
          <p>{ingredient.count} Verkäufer</p>
          <p>
            {(ingredient.standardised_price / ingredient.count).toFixed(2)}€ /
            kg
          </p>
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
