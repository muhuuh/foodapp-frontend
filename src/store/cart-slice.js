import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase/supabase";

// Async thunk to fetch user profile from the database
export const fetchCartHistory = createAsyncThunk(
  "cart/fetchCartHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("cart")
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

const defaultState = {
  currentCart: {
    cart_ingredients: [],
    cart_total_price: 0,
    cart_total_amount: 0,
    wish_date_pickup: "",
  },
  cartHistory: {},
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "ingredients",
  initialState: defaultState,
  reducers: {
    updateCartLocal(state, action) {
      const { ingredient, amount, action: updateAction } = action.payload;
      const existingIngredient = state.currentCart.cart_ingredients.find(
        (item) =>
          item.ingredient.general_name === ingredient.general_name &&
          item.ingredient.store_id === ingredient.store_id
      );

      if (existingIngredient) {
        if (updateAction === "increase") {
          existingIngredient.amount += amount;
        } else if (
          updateAction === "decrease" &&
          existingIngredient.amount > 0
        ) {
          existingIngredient.amount -= amount;
        }
      } else if (updateAction === "increase") {
        state.currentCart.cart_ingredients.push({ ingredient, amount });
      }

      state.currentCart.cart_total_amount =
        state.currentCart.cart_ingredients.reduce(
          (total, item) => total + item.amount,
          0
        );
      state.currentCart.cart_total_price =
        state.currentCart.cart_ingredients.reduce(
          (total, item) =>
            total + item.amount * parseFloat(item.ingredient.price),
          0
        );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.cartHistory = action.payload;
      })
      .addCase(fetchCartHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
