import React, { useState } from "react";
import { useSelector } from "react-redux";
import IngredientBox from "../../../components/Store/Ingredient/IngredientBox";
import IngredientDetail from "../../../components/Store/Ingredient/IngredientDetail";

const IngredientMain = () => {
  const data = useSelector((state) => state.ingredients);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Einkaufen</h1>
      <p className="mb-4">{data.intro_sentence}</p>
      {selectedIngredient ? (
        <IngredientDetail
          ingredient={selectedIngredient}
          onBack={() => setSelectedIngredient(null)}
        />
      ) : (
        data.ingredients.map((ingredient, index) => (
          <IngredientBox
            key={index}
            ingredient={ingredient}
            onClick={() => handleIngredientClick(ingredient)}
          />
        ))
      )}
    </div>
  );
};

export default IngredientMain;
