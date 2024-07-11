// components/RecipeBox.js
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteRecipeFromDB,
  toggleFavoriteRecipeInDB,
} from "../../store/recipe-slice";

const RecipeBox = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteRecipeFromDB(recipe.id));
  };

  const handleFavoriteToggle = () => {
    dispatch(
      toggleFavoriteRecipeInDB({
        recipeId: recipe.id,
        favorited: !recipe.favorited,
      })
    );
  };

  const handleNavigate = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div
      className="border rounded p-4 mb-4 cursor-pointer"
      onClick={handleNavigate}
    >
      <h2 className="text-xl font-bold mb-2">
        {recipe.recipe_info.recipe_title}
      </h2>
      {recipe.image_link && (
        <img
          src={recipe.image_link}
          alt={recipe.recipe_info.recipe_title}
          className="mb-2"
        />
      )}
      <div className="flex justify-between">
        <button onClick={handleFavoriteToggle}>
          {recipe.favorited ? "★" : "☆"}
        </button>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default RecipeBox;
