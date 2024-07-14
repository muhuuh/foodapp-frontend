import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { updateShoppingListCommentInDB } from "../../store/recipe-slice";
import CommentModal from "../Recipes/CommentModal";

const ShoppingListBox = ({ shoppingList }) => {
  const dispatch = useDispatch();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState(shoppingList.user_comment || "");

  const handleCheckLocalClick = (e) => {
    e.stopPropagation();
    alert("Checking local stores is not implemented yet.");
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/shoppinglist/${shoppingList.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.stopPropagation();
    dispatch(
      updateShoppingListCommentInDB({
        id: shoppingList.id,
        user_comment: comment,
      })
    );
    setShowCommentModal(false);
  };

  return (
    <div className="border rounded p-4 mb-4 relative cursor-pointer">
      <div className="absolute top-2 right-2 bg-white p-1 rounded shadow-md z-10">
        <div className="flex items-center space-x-2">
          <span className="text-xs">
            {format(new Date(shoppingList.created_at), "dd/MM")}
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
        {shoppingList.list_name}
      </h2>
      <ul className="list-disc ml-6 mb-4">
        {shoppingList.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <button
        onClick={handleCheckLocalClick}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Prüfen ob lokal
      </button>
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

export default ShoppingListBox;
