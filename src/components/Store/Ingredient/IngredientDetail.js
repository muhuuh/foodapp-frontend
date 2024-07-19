import React from "react";

const IngredientDetail = ({ ingredient, onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="mb-4 p-2 bg-gray-200 rounded-full">
        ← Zurück
      </button>
      <h2 className="text-xl font-bold mb-2">{ingredient.general_name}</h2>
      <div className="border rounded p-4 mb-4">
        <p>Store: {ingredient.store_id}</p>
        <p>Name: {ingredient.store_specific_name}</p>
        <p>Pack Size: {ingredient.pack_size}</p>
        <p>Price: {ingredient.price}€</p>
        <div className="flex items-center">
          <button className="p-2 bg-blue-500 text-white rounded">- 1 +</button>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetail;
