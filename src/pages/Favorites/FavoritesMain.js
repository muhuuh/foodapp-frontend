// components/FavoritesMain.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Title from "../../components/General/Title";
import RecipeBox from "../../components/Recipes/RecipeBox";
import ShoppingListOverview from "./ShoppingListOverview";

const FavoritesMain = () => {
  const [view, setView] = useState("Rezepte");
  const { recipes, shoppingLists, loading } = useSelector(
    (state) => state.recipes
  );

  const title = "Favoriten";

  const favoriteRecipes = recipes.filter((recipe) => recipe.favorited);

  console.log("shoppingLists");
  console.log(shoppingLists);

  return (
    <div className="p-4 max-w-sm mx-auto">
      <Title text={title} />
      <div className="flex justify-center my-4">
        <button
          className={`p-2 rounded ${
            view === "Rezepte" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("Rezepte")}
        >
          Rezepte
        </button>
        <button
          className={`p-2 rounded ${
            view === "Shoppinglist" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("Shoppinglist")}
        >
          Shoppinglist
        </button>
      </div>

      {view === "Rezepte" && (
        <div>
          {loading && <p>Loading...</p>}
          {!loading && favoriteRecipes.length > 0 ? (
            favoriteRecipes.map((recipe) => (
              <RecipeBox key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p>Keine Favoriten verfügbar.</p>
          )}
        </div>
      )}
      {view === "Shoppinglist" && (
        <ShoppingListOverview shoppingLists={shoppingLists} />
      )}
    </div>
  );
};

export default FavoritesMain;
