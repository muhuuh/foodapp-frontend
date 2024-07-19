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
    cart_ingredients: [{ ingredient: "", amount: 0, price: 0 }],
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
      state.currentCart = action.payload;
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

export const {} = cartSlice.actions;
export default cartSlice.reducer;
