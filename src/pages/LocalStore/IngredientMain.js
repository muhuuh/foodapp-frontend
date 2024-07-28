import React, { useState } from "react";
import { useSelector } from "react-redux";
import IngredientBox from "../../components/Store/Ingredient/IngredientBox";

const IngredientMain = () => {
  const data = useSelector((state) => state.ingredients);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  // Summarize the ingredients
  const summarizedIngredients = data.ingredients.reduce((acc, ingredient) => {
    const found = acc.find(
      (item) => item.general_name === ingredient.general_name
    );
    if (found) {
      found.count += 1;
      found.standardised_price += ingredient.standardised_price; // Assuming standardised_price is a number
    } else {
      acc.push({
        ...ingredient,
        count: 1,
        standardised_price: ingredient.standardised_price, // Assuming standardised_price is a number
      });
    }
    return acc;
  }, []);

  const handleIngredientClick = (ingredient) => {
    if (selectedIngredient === ingredient.general_name) {
      setSelectedIngredient(null);
    } else {
      setSelectedIngredient(ingredient.general_name);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Einkaufen</h1>
      <p className="mb-4">{data.ai_ingredient_search.explanation}</p>
      {summarizedIngredients.map((ingredient, index) => (
        <IngredientBox
          key={index}
          ingredient={ingredient}
          onClick={() => handleIngredientClick(ingredient)}
          isSelected={selectedIngredient === ingredient.general_name}
        />
      ))}
    </div>
  );
};

export default IngredientMain;
