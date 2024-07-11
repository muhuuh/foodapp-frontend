// components/RecipeDetail.js
import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useSelector((state) =>
    state.recipes.recipes.find((recipe) => recipe.id === id)
  );

  if (!recipe) {
    return <p>Rezept nicht gefunden.</p>;
  }

  const ingredients = recipe.recipe_info.ingredients.split(", ");
  const instructions = recipe.recipe_info.instructions
    .split(/(?<=\.)\s/)
    .map((instruction) => instruction.replace(/^\d+\.\s*/, ""))
    .filter((instruction) => instruction.trim() !== ""); // Filter out empty instructions

  return (
    <div className="p-4 max-w-md mx-auto relative">
      <button
        onClick={() => navigate("/recipe_overview")}
        className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full"
      >
        ← Zurück
      </button>
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
      <ul className="list-disc ml-6 mb-4">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-lg font-bold mb-2">Anweisungen</h2>
      <ol className="list-decimal ml-6 mb-4">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
