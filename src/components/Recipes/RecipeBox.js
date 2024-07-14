// components/Recipes/RecipeBox.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteRecipeFromDB,
  toggleFavoriteRecipeInDB,
  updateRecipeCommentInDB,
} from "../../store/recipe-slice";
import { format } from "date-fns";
import LoadingSpinner from "../../components/General/LoadingSpinner";
import CommentModal from "./CommentModal";

const RecipeBox = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState(recipe.user_comment || "");

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
    if (!showCommentModal) {
      navigate(`/recipe/${recipe.id}`);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.stopPropagation();
    dispatch(
      updateRecipeCommentInDB({
        id: recipe.id,
        user_comment: comment,
      })
    );
    setShowCommentModal(false);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/recipe/${recipe.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div
      className="border rounded p-4 mb-4 relative cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="absolute top-2 right-2 bg-white p-1 rounded shadow-md z-10">
        <div className="flex items-center space-x-2">
          <span className="text-xs">
            {format(new Date(recipe.created_at), "dd/MM")}
          </span>
          <button onClick={handleShareClick}>🔗</button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCommentModal(true);
            }}
          >
            💬
          </button>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2 overflow-hidden text-ellipsis">
        {recipe.recipe_info.recipe_title}
      </h2>
      {recipe.image_link ? (
        <img
          src={recipe.image_link}
          alt={recipe.recipe_info.recipe_title}
          className="mb-2 w-full h-40 object-cover"
        />
      ) : (
        <div className="mb-2 w-full h-40 bg-gray-200 flex items-center justify-center">
          <div>
            <LoadingSpinner />
            <p className="text-center">Bilder werden kreiert, ein Moment ...</p>
          </div>
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
      <CommentModal
        isOpen={showCommentModal}
        onRequestClose={() => setShowCommentModal(false)}
        comment={comment}
        onCommentChange={handleCommentChange}
        onCommentSubmit={handleCommentSubmit}
      />
    </div>
  );
};

export default RecipeBox;
