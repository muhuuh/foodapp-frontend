import React from "react";
import { format } from "date-fns";

const ShoppingListBox = ({ shoppingList }) => {
  const handleCheckLocalClick = (e) => {
    e.stopPropagation();
    alert("Checking local stores is not implemented yet.");
  };

  return (
    <div className="border rounded p-4 mb-4 relative cursor-pointer">
      <div className="absolute top-2 right-2 bg-white p-1 rounded shadow-md z-10">
        <span className="text-xs">
          {format(new Date(shoppingList.created_at), "dd/MM")}
        </span>
      </div>
      <h2 className="text-xl font-bold mb-2 overflow-hidden text-ellipsis">
        {shoppingList.list_name}
      </h2>
      <ul className="list-disc ml-6 mb-4">
        {shoppingList.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <button
        onClick={handleCheckLocalClick}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Prüfen ob lokal
      </button>
    </div>
  );
};

export default ShoppingListBox;
