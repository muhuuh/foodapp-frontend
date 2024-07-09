import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user-slice";
import recipesReducer from "./recipe-slice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    recipes: recipesReducer,
  },
});

export default store;
