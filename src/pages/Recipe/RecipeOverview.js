// components/RecipeOverview.js
import React from "react";
import { useSelector } from "react-redux";
import RecipeBox from "../../components/Recipes/RecipeBox";
import Title from "../../components/General/Title";

const RecipeOverview = () => {
  const { recipes, loading } = useSelector((state) => state.recipes);
  const title = "Rezepte Übersicht";

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
      <Title text={title} />
      <h1 className="text-2xl font-bold mb-4"></h1>
      {loading && <p>Loading...</p>}
      {!loading && validRecipes.length > 0 ? (
        validRecipes.map((recipe) => (
          <RecipeBox key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <p>Keine Rezepte verfügbar.</p>
      )}
    </div>
  );
};

export default RecipeOverview;
