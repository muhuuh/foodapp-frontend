// store/recipesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase/supabase";

// Async thunk to fetch recipes from the database
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to save recipes to the database
export const saveRecipesToDB = createAsyncThunk(
  "recipes/saveRecipesToDB",
  async ({ userId, recipes }, { rejectWithValue }) => {
    try {
      const recipeInserts = recipes.map((recipe) => ({
        user_id: userId,
        recipe_info: recipe.recipe_info,
        created_at: new Date().toISOString(),
      }));

      const { data, error } = await supabase
        .from("recipes")
        .insert(recipeInserts);

      if (error) {
        throw new Error(error.message);
      }
      return data; // return inserted data
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to delete a recipe from the database
export const deleteRecipeFromDB = createAsyncThunk(
  "recipes/deleteRecipeFromDB",
  async (recipeId, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", recipeId);

      if (error) {
        throw new Error(error.message);
      }
      return recipeId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to toggle the favorite status of a recipe
export const toggleFavoriteRecipeInDB = createAsyncThunk(
  "recipes/toggleFavoriteRecipeInDB",
  async ({ recipeId, favorited }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .update({ favorited })
        .eq("id", recipeId);

      if (error) {
        throw new Error(error.message);
      }
      return { recipeId, favorited };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const defaultState = {
  recipes: [],
  loading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState: defaultState,
  reducers: {
    addRecipesToStore(state, action) {
      state.recipes = [...action.payload, ...state.recipes];
    },
    removeRecipeFromStore(state, action) {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    updateRecipeInStore(state, action) {
      const { recipeId, favorited } = action.payload;
      const recipe = state.recipes.find((recipe) => recipe.id === recipeId);
      if (recipe) {
        recipe.favorited = favorited;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveRecipesToDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveRecipesToDB.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure action.payload is an array before spreading
        if (Array.isArray(action.payload)) {
          state.recipes = [...state.recipes, ...action.payload];
        }
      })
      .addCase(saveRecipesToDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRecipeFromDB.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(
          (recipe) => recipe.id !== action.payload
        );
      })
      .addCase(toggleFavoriteRecipeInDB.fulfilled, (state, action) => {
        const { recipeId, favorited } = action.payload;
        const recipe = state.recipes.find((recipe) => recipe.id === recipeId);
        if (recipe) {
          recipe.favorited = favorited;
        }
      });
  },
});

export const { addRecipesToStore, removeRecipeFromStore, updateRecipeInStore } =
  recipesSlice.actions;
export default recipesSlice.reducer;
