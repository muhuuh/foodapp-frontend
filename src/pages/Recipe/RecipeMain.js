// components/RecipeMain.js
import React, { useState } from "react";

import { getRecipeFromAI } from "../../services/openaiApi";
import AIInputForm from "../../components/AI/AIInputForm";

const RecipeMain = () => {
  const [recipe, setRecipe] = useState(null);

  const options = [
    {
      name: "diet",
      values: ["Mit Fleisch", "Vegetarisch", "Vegan"],
    },
    {
      name: "spice",
      values: ["Scharf", "Mild"],
    },
    // Add more options as needed
  ];

  const instructions = "Erklären Sie, was Sie essen möchten";

  const handleAIInputSubmit = async (userInput, additionalOptions, file) => {
    try {
      const optionsArray = Object.values(additionalOptions);
      const result = await getRecipeFromAI(userInput, optionsArray);
      // Handle file upload here if necessary
      setRecipe(result);
    } catch (error) {
      console.error("Fehler beim Abrufen des Rezepts:", error);
    }
  };

  return (
    <div className="p-4">
      <AIInputForm
        onSubmit={handleAIInputSubmit}
        options={options}
        instructions={instructions}
      />
      {recipe && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">{recipe.recipe_title}</h2>
          <h3 className="text-lg mt-2">Zutaten</h3>
          <p>{recipe.ingredients}</p>
          <h3 className="text-lg mt-2">Anweisungen</h3>
          <p>{recipe.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeMain;
