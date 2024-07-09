// components/RecipeOverview.js
import React from "react";
import { useLocation } from "react-router-dom";

const RecipeOverview = () => {
  const location = useLocation();
  const { recipes } = location.state || { recipes: [] };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rezepte Übersicht</h1>
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-bold">{recipe.recipe_title}</h2>
            <h3 className="text-lg mt-2">Zutaten</h3>
            <p>{recipe.ingredients}</p>
            <h3 className="text-lg mt-2">Anweisungen</h3>
            <p>{recipe.instructions}</p>
          </div>
        ))
      ) : (
        <p>Keine Rezepte verfügbar.</p>
      )}
    </div>
  );
};

export default RecipeOverview;
