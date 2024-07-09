// components/RecipeOverview.js
import React from "react";
import { useSelector } from "react-redux";

const RecipeOverview = () => {
  const { recipes, loading } = useSelector((state) => state.recipes);

  // Filter out any invalid recipes
  const validRecipes = recipes.filter(
    (recipe) =>
      recipe &&
      recipe.recipe_info &&
      recipe.recipe_info.recipe_title &&
      recipe.recipe_info.ingredients &&
      recipe.recipe_info.instructions
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rezepte Übersicht</h1>
      {loading && <p>Loading...</p>}
      {!loading && validRecipes.length > 0 ? (
        validRecipes.map((recipe, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-bold">
              {recipe.recipe_info.recipe_title}
            </h2>
            <h3 className="text-lg mt-2">Zutaten</h3>
            <p>{recipe.recipe_info.ingredients}</p>
            <h3 className="text-lg mt-2">Anweisungen</h3>
            <p>{recipe.recipe_info.instructions}</p>
          </div>
        ))
      ) : (
        <p>Keine Rezepte verfügbar.</p>
      )}
    </div>
  );
};

export default RecipeOverview;
