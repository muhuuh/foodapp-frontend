// components/IngredientInput.js
import React, { useState } from "react";

const IngredientInput = ({ onChange, showIngredients }) => {
  const [ingredients, setIngredients] = useState([
    { ingredient: "", quantity: "" },
  ]);

  const handleAddRow = () => {
    setIngredients([...ingredients, { ingredient: "", quantity: "" }]);
  };

  const handleRemoveRow = (index) => {
    const newIngredients = ingredients.filter((_, idx) => idx !== index);
    setIngredients(newIngredients);
    onChange(newIngredients);
  };

  const handleChange = (index, field, value) => {
    const newIngredients = ingredients.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setIngredients(newIngredients);
    onChange(newIngredients);
  };

  return showIngredients ? (
    <div className="mb-4">
      {ingredients.map((item, index) => (
        <div key={index} className="flex items-center mb-2 w-full space-x-2">
          <input
            type="text"
            className="p-2 border rounded flex-grow min-w-0"
            placeholder="Zutat"
            value={item.ingredient}
            onChange={(e) => handleChange(index, "ingredient", e.target.value)}
          />
          <input
            type="text"
            className="p-2 border rounded flex-grow min-w-0"
            placeholder="Menge"
            value={item.quantity}
            onChange={(e) => handleChange(index, "quantity", e.target.value)}
          />
          <button
            className="bg-red-500 text-white p-2 rounded flex-shrink-0"
            onClick={() => handleRemoveRow(index)}
          >
            Löschen
          </button>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleAddRow}
      >
        Zutat hinzufügen
      </button>
    </div>
  ) : null;
};

export default IngredientInput;
