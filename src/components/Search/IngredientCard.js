import React from "react";

const IngredientCard = ({ ingredient, selected, toggleIngredient }) => {
  return (
    <div
      className={`p-4 m-2 border rounded cursor-pointer ${
        selected ? "bg-green-200" : "bg-white"
      }`}
      onClick={() => toggleIngredient(ingredient)}
    >
      {ingredient}
    </div>
  );
};

export default IngredientCard;
