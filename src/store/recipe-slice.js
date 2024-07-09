import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase/supabase";

// Async thunk to fetch user profile from the database
export const fetchRecipes = createAsyncThunk(
  "recipes/recipe",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", userId);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to update user profile in the database
export const updateRecipesInDB = createAsyncThunk(
  "recipes/updateRecipesInDB",
  async (recipesData, { rejectWithValue }) => {
    try {
      const { id, ...updateData } = recipesData;
      const { data, error } = await supabase
        .from("user_profiles")
        .update(updateData)
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
      return data[0]; // Return the updated profile
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const defaultState = {
  recipes: {},
  loading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    updateRecipesLocal(state, action) {
      state.recipes = { ...state.recipes, ...action.payload };
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
        state.userProfile = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateUserProfileLocal, setUserId } = recipesSlice.actions;
export default recipesSlice.reducer;
