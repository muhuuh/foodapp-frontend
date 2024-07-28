import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase/supabase";

// Async thunk to fetch all unique ingredient names
export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("ingredients")
        .select("general_name");
      if (error) {
        throw new Error(error.message);
      }
      // Extract unique ingredient names
      const uniqueIngredients = [
        ...new Set(data.map((item) => item.general_name)),
      ];
      return uniqueIngredients;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to fetch specific ingredients by their general names
export const fetchIngredientsByName = createAsyncThunk(
  "ingredients/fetchIngredientsByName",
  async (ingredientNames, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("ingredients")
        .select("*")
        .in("general_name", ingredientNames);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const defaultState = {
  ingredient_general_available: [],
  ai_ingredient_search: {},
  ingredients: [],
  loading: false,
  error: null,
};

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: defaultState,
  reducers: {
    saveAIOutputToStore(state, action) {
      state.ai_ingredient_search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredient_general_available = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchIngredientsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredientsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { saveAIOutputToStore } = ingredientSlice.actions;
export default ingredientSlice.reducer;
