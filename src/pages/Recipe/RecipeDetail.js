// components/RecipeDetail.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toggleShoppingList } from "../../store/recipe-slice";
import RecipeModification from "../../components/Recipes/RecipeModification";
import LoadingSpinner from "../../components/General/LoadingSpinner";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.userId);
  const recipe = useSelector((state) =>
    state.recipes.recipes.find((recipe) => recipe.id === id)
  );
  const shoppingLists = useSelector((state) => state.recipes.shoppingLists);

  const [isInShoppingList, setIsInShoppingList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (recipe) {
      const ingredients = recipe.recipe_info.ingredients.split(", ");
      const existingList = shoppingLists.find(
        (list) =>
          list.user_id === userId &&
          JSON.stringify(list.ingredients) === JSON.stringify(ingredients)
      );
      setIsInShoppingList(!!existingList);
    }
  }, [recipe, shoppingLists, userId]);

  if (!recipe) {
    return <p>Rezept nicht gefunden.</p>;
  }

  const ingredients = recipe.recipe_info.ingredients.split(", ");
  const instructions = recipe.recipe_info.instructions
    .split(/(?<=\.)\s/)
    .map((instruction) => instruction.replace(/^\d+\.\s*/, ""))
    .filter((instruction) => instruction.trim() !== ""); // Filter out empty instructions

  const handleToggleShoppingList = () => {
    dispatch(toggleShoppingList({ userId, ingredients }));
    setIsInShoppingList((prev) => !prev);
  };

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
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold mb-2">Zutaten</h2>
        <button
          onClick={handleToggleShoppingList}
          className={`p-2 rounded-full ${
            isInShoppingList ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          {isInShoppingList ? "In Einkaufsliste" : "Zur Einkaufsliste"}
        </button>
      </div>
      <ul className="list-disc ml-6 mb-4">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <RecipeModification recipe={recipe} />
      <ol className="list-decimal ml-6 mb-4">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      {isLoading && (
        <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
