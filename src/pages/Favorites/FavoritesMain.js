import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Title from "../../components/General/Title";
import RecipeBox from "../../components/Recipes/RecipeBox";
import ShopBox from "../../components/Store/Shop/ShopBox";
import { fetchFavoriteShops } from "../../store/user-slice";

const FavoritesMain = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [view, setView] = useState("Rezepte");
  const { userProfile, loading } = useSelector((state) => state.users);
  const { recipes } = useSelector((state) => state.recipes);
  const { favorites } = useSelector((state) => state.users);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteShops, setFavoriteShops] = useState([]);

  const title = "Favoriten";

  useEffect(() => {
    if (location.state?.view) {
      setView(location.state.view);
    }

    if (userProfile.favorited) {
      // Filter favorite recipes from all recipes using the favorite_recipes IDs
      const filteredFavoriteRecipes = recipes.filter((recipe) =>
        userProfile.favorited.favorite_recipes.includes(recipe.id)
      );
      setFavoriteRecipes(filteredFavoriteRecipes);

      if (view === "Shops") {
        // Fetch favorite shops when the "Shops" tab is clicked
        dispatch(fetchFavoriteShops(userProfile.favorited.favorite_shops));
      }
    }
  }, [location.state, userProfile.favorited, recipes, view, dispatch]);

  useEffect(() => {
    if (view === "Shops" && favorites.shops.length > 0) {
      setFavoriteShops(favorites.shops);
    }
  }, [view, favorites.shops]);

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
            view === "Shops" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("Shops")}
        >
          Shops
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
      {view === "Shops" && (
        <div>
          {loading && <p>Loading...</p>}
          {!loading && favoriteShops.length > 0 ? (
            favoriteShops.map((shop) => <ShopBox key={shop.id} shop={shop} />)
          ) : (
            <p>Keine Favoriten verfügbar.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesMain;
