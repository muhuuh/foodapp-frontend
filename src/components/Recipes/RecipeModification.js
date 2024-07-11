// components/RecipeModification.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateRecipeInDB } from "../../store/recipe-slice";
import { modifyRecipeWithAI } from "../../services/openaiApi";
import LoadingSpinner from "../General/LoadingSpinner";

const RecipeModification = ({ recipe }) => {
  const dispatch = useDispatch();
  const [showModificationInput, setShowModificationInput] = useState(false);
  const [modificationText, setModificationText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleModificationSubmit = async () => {
    if (!modificationText.trim()) return;

    setIsLoading(true);
    try {
      const modifiedRecipe = await modifyRecipeWithAI({
        recipe,
        modificationText,
      });

      // Dispatch the action to update the recipe in the Redux store and Supabase
      dispatch(
        updateRecipeInDB({ id: recipe.id, recipe_info: modifiedRecipe })
      );
    } catch (error) {
      console.error("Error modifying the recipe:", error);
    } finally {
      setShowModificationInput(false);
      setModificationText("");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold mb-2">Anweisungen</h2>
        <button
          onClick={() => setShowModificationInput(!showModificationInput)}
          className="p-2 bg-blue-500 text-white rounded-full"
        >
          Rezept ändern
        </button>
      </div>
      {showModificationInput && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded mb-2"
            value={modificationText}
            onChange={(e) => setModificationText(e.target.value)}
            placeholder="Beschreiben Sie, wie das Rezept geändert werden soll..."
          />
          <button
            onClick={handleModificationSubmit}
            className="p-2 bg-green-500 text-white rounded"
          >
            Änderungen speichern
          </button>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default RecipeModification;
