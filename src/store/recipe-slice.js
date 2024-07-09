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
        .eq("user_id", userId);

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
        recipe_info: recipe,
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
      state.recipes = [...state.recipes, ...action.payload];
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
      });
  },
});

export const { addRecipesToStore } = recipesSlice.actions;
export default recipesSlice.reducer;
