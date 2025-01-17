// App.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "./services/supabase/supabase";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./services/supabase/PrivateRoute";
import { fetchUserProfile, setUserId } from "./store/user-slice";
import { fetchRecipes, fetchShoppingLists } from "./store/recipe-slice";
import Signin from "./pages/Login/Signin";
import SignUp from "./pages/Login/Signup";
import ResetPassword from "./components/Login/ResetPassword";
import Settings from "./pages/Login/Settings";
import RecipeMain from "./pages/Recipe/RecipeMain";
import RecipeOverview from "./pages/Recipe/RecipeOverview";
import RecipeDetail from "./pages/Recipe/RecipeDetail";
import LocalIngredientSearch from "./pages/LocalStore/Ingredients/LocalIngredientSearch";
import Landingpage from "./pages/Landingpage";
import FavoritesMain from "./pages/Favorites/FavoritesMain";
import Footer from "./components/General/Footer";
import ShoppingDetail from "./pages/Favorites/ShoppingDetail";
import ShopMain from "./pages/LocalStore/Shop/ShopMain";
import IngredientMain from "./pages/LocalStore/Ingredients/IngredientMain";
import CartMain from "./pages/Cart/CartMain";
import ShopDetailPage from "./pages/LocalStore/Shop/ShopDetailPage";
import ShoppingListOverview from "./pages/Favorites/ShoppingListOverview";

function App() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.users);

  //------------------- handle signing in/out and getting user ID ----------------
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        dispatch(setUserId(session.user.id));
      }
    };
    getSession();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        dispatch(setUserId(session.user.id));
      } else if (event === "SIGNED_OUT") {
        dispatch(setUserId(null));
      }
    });
  }, [dispatch]);

  //------------------ fetch user profile -----------------
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId]);

  //------------------ fetch recipes -----------------
  useEffect(() => {
    if (userId) {
      dispatch(fetchRecipes(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/landingpage" element={<Landingpage />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/ingredient_search"
            element={<LocalIngredientSearch />}
          />
          <Route path="/ingredient_overview" element={<IngredientMain />} />
          <Route path="/shop_overview" element={<ShopMain />} />
          <Route path="/shop_detailpage" element={<ShopDetailPage />} />
          <Route path="/recipe_creation" element={<RecipeMain />} />
          <Route path="/recipe_overview" element={<RecipeOverview />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/shoppinglisten" element={<ShoppingListOverview />} />
          <Route path="/shoppinglist/:id" element={<ShoppingDetail />} />
          <Route path="/favorites" element={<FavoritesMain />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/cart" element={<CartMain />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
