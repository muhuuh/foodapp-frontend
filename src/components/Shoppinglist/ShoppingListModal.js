// components/Recipes/ShoppingListModal.js
import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ShoppingListModal = ({ isOpen, onRequestClose, ingredients, onSave }) => {
  const [listName, setListName] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState(
    ingredients.map((ingredient) => ({ name: ingredient, selected: true }))
  );

  const handleIngredientToggle = (index) => {
    const newIngredients = [...selectedIngredients];
    newIngredients[index].selected = !newIngredients[index].selected;
    setSelectedIngredients(newIngredients);
  };

  const handleSave = () => {
    const filteredIngredients = selectedIngredients
      .filter((ingredient) => ingredient.selected)
      .map((ingredient) => ingredient.name);
    onSave(listName, filteredIngredients);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Einkaufsliste hinzufügen"
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Einkaufsliste hinzufügen</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Name der Einkaufsliste"
        />
        <ul className="list-disc ml-6 mb-4">
          {selectedIngredients.map((ingredient, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={ingredient.selected}
                  onChange={() => handleIngredientToggle(index)}
                />
                {ingredient.name}
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={handleSave}
          className="p-2 bg-green-500 text-white rounded"
        >
          Speichern
        </button>
      </div>
    </Modal>
  );
};

export default ShoppingListModal;
