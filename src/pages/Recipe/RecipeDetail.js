import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = useSelector((state) =>
    state.recipes.recipes.find((recipe) => recipe.id === id)
  );

  if (!recipe) {
    return <p>Rezept nicht gefunden.</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {recipe.recipe_info.recipe_title}
      </h1>
      {recipe.image_link && (
        <img
          src={recipe.image_link}
          alt={recipe.recipe_info.recipe_title}
          className="mb-4"
        />
      )}
      <h2 className="text-lg font-bold mb-2">Zutaten</h2>
      <p>{recipe.recipe_info.ingredients}</p>
      <h2 className="text-lg font-bold mb-2">Anweisungen</h2>
      <p>{recipe.recipe_info.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
