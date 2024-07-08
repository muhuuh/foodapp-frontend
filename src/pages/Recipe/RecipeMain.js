// components/Form.js
import React, { useState } from "react";
import { getRecipeFromAI } from "../../services/openaiApi";

const RecipeMain = () => {
  const [userInput, setUserInput] = useState("");
  const [additionalOptions, setAdditionalOptions] = useState([]);
  const [recipe, setRecipe] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await getRecipeFromAI(userInput, additionalOptions);
      setRecipe(result);
    } catch (error) {
      console.error("Fehler beim Abrufen des Rezepts:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Geben Sie ein, was Sie essen möchten..."
        />
        <select
          multiple
          onChange={(e) =>
            setAdditionalOptions(
              [...e.target.selectedOptions].map((option) => option.value)
            )
          }
        >
          <option value="mit Fleisch">Mit Fleisch</option>
          <option value="vegetarisch">Vegetarisch</option>
          {/* Add more options as needed */}
        </select>
        <button type="submit">Rezept abrufen</button>
      </form>
      {recipe && (
        <div>
          <h2>{recipe.recipe_title}</h2>
          <h3>Zutaten</h3>
          <p>{recipe.ingredients}</p>
          <h3>Anweisungen</h3>
          <p>{recipe.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeMain;
