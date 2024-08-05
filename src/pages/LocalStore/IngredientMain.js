import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IngredientBox from "../../components/Store/Ingredient/IngredientBox";

const IngredientMain = () => {
  const data = useSelector((state) => state.ingredients);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const navigate = useNavigate();

  const { userId } = useSelector((state) => state.users);
  console.log(userId);

  const summarizedIngredients = data.ingredients.reduce((acc, ingredient) => {
    const found = acc.find(
      (item) => item.general_name === ingredient.general_name
    );
    if (found) {
      found.count += 1;
      found.standardised_price += ingredient.standardised_price;
    } else {
      acc.push({
        ...ingredient,
        count: 1,
        standardised_price: ingredient.standardised_price,
      });
    }
    return acc;
  }, []);

  const unavailableIngredients =
    data.ai_ingredient_search.ingredients_general.filter(
      (generalIngredient) =>
        !data.ai_ingredient_search.ingredients_available.includes(
          generalIngredient
        )
    );

  const handleIngredientClick = (ingredient) => {
    if (selectedIngredient === ingredient.general_name) {
      setSelectedIngredient(null);
    } else {
      setSelectedIngredient(ingredient.general_name);
    }
  };

  const handleToggleUnavailable = () => {
    setShowUnavailable(!showUnavailable);
  };

  const handleBackClick = () => {
    navigate("/main_view");
  };

  return (
    <div className="p-4 max-w-md mx-auto mb-16">
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
      <button
        onClick={handleToggleUnavailable}
        className="block w-full p-2 bg-red-500 text-white rounded mt-4"
      >
        {showUnavailable
          ? "Verstecke nicht verfügbare Zutaten"
          : "Nicht verfügbare Zutaten"}
      </button>
      {showUnavailable && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Nicht verfügbare Zutaten</h2>
          <ul>
            {unavailableIngredients.map((ingredient, index) => (
              <li key={index} className="mb-2">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={handleBackClick}
        className="block w-full p-2 bg-teal-500 text-white rounded mt-4"
      >
        Zurück
      </button>
    </div>
  );
};

export default IngredientMain;
