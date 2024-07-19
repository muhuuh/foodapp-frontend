import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase/supabase";

// Async thunk to fetch user profile from the database
export const fetchIngredients = createAsyncThunk(
  "user/fetchIngredients",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("ingredients")
        .select("*")
        .eq("id", userId)
        .single();

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
  intro_sentence: "AI short sentence to introduce, the results of the search",
  ingredients: [
    {
      general_name: "banana",
      store_specific_name: "banana xtra fresh",
      ingredient_image: "",
      pack_size: "500g",
      price: "5.49",
      standardised_price: "11.49/kg",
      store_id: "store_a",
    },
    {
      general_name: "banana",
      store_specific_name: "banana green fresh",
      ingredient_image: "",
      pack_size: "400g",
      price: "6.49",
      standardised_price: "13.49/kg",
      store_id: "store_b",
    },
    {
      general_name: "tomatoe",
      store_specific_name: "tomatoe xtra big",
      ingredient_image: "",
      pack_size: "400g",
      price: "2.49",
      standardised_price: "5.49/kg",
      store_id: "store_a",
    },
  ],
  loading: false,
  error: null,
};

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: defaultState,
  reducers: {
    fetchIngredientsLocal(state, action) {
      state.ingredients = action.payload;
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
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = ingredientSlice.actions;
export default ingredientSlice.reducer;
