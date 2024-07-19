import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user-slice";
import recipesReducer from "./recipe-slice";
import ingredientReducer from "./ingredient-slice";
import cartReducer from "./cart-slice";
import shopReducer from "./shop-slice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    recipes: recipesReducer,
    ingredients: ingredientReducer,
    cart: cartReducer,
    shops: shopReducer,
  },
});

export default store;
