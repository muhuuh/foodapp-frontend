// components/RecipeBox.js
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteRecipeFromDB,
  toggleFavoriteRecipeInDB,
} from "../../store/recipe-slice";
import LoadingSpinner from "../General/LoadingSpinner";

const RecipeBox = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent navigation
    dispatch(deleteRecipeFromDB(recipe.id));
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // Prevent navigation
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
      {recipe.image_link ? (
        <img
          src={recipe.image_link}
          alt={recipe.recipe_info.recipe_title}
          className="mb-2"
        />
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-200 h-48">
          <LoadingSpinner />
          <span className="text-gray-600 mt-2">
            Bilder werden kreiert, ein Moment ...
          </span>
        </div>
      )}
      <div
        className="flex justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleFavoriteToggle}>
          {recipe.favorited ? "★" : "☆"}
        </button>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default RecipeBox;
