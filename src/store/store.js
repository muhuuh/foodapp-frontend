import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user-slice";
import recipesReducer from "./recipe-slice";
import ingredientReducer from "./ingredient-slice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    recipes: recipesReducer,
    ingredients: ingredientReducer,
  },
});

export default store;
