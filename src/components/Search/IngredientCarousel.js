import React from "react";
import IngredientCard from "./IngredientCard";

const IngredientCarousel = ({
  selectedIngredients,
  setSelectedIngredients,
}) => {
  const ingredients = [
    "Tomate",
    "Zwiebel",
    "Knoblauch",
    "Kartoffel",
    "Karotte",
  ]; // Sample data

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== ingredient)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  return (
    <div className="flex overflow-x-scroll py-2">
      {ingredients.map((ingredient) => (
        <IngredientCard
          key={ingredient}
          ingredient={ingredient}
          selected={selectedIngredients.includes(ingredient)}
          toggleIngredient={toggleIngredient}
        />
      ))}
    </div>
  );
};

export default IngredientCarousel;
