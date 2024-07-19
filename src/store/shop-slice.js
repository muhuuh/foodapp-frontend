// store/shop-slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase/supabase";

// Async thunk to fetch shops profile from the database
export const fetchShops = createAsyncThunk(
  "shops/fetchShops",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("store").select("*");
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
      id: "d1d566b1-4510-49ea-838d-1a97a401d550",
      store_name: "Bauernhof Mueller",
      web_link: "",
      store_image_link: "",
      descriprion: "a few sentences that describes the store",
      keywords: ["best food", "Bauernhof", "Frisch", "Bio"],
      favorited: 77,
      google_stars: 4.3,
    },
    {
      id: "d1d566b1-4510-49ea-838d-1a97a401d551",
      store_name: "Metzgerei Anna",
      web_link: "",
      store_image_link: "",
      descriprion: "a few sentences that describes the store",
      keywords: ["best food", "Obst", "Gemuese", "Lokal"],
      favorited: 12,
      google_stars: 4.7,
    },
    {
      id: "d1d566b1-4510-49ea-838d-1a97a401d552",
      store_name: "Baeckerei Weber",
      web_link: "",
      store_image_link: "",
      descriprion: "a few sentences that describes the store",
      keywords: ["Brot", "Frisch", "Knackig", "Lokal"],
      favorited: 102,
      google_stars: 3.9,
    },
  ],
  loading: false,
  error: null,
};

const shopSlice = createSlice({
  name: "shops",
  initialState: defaultState,
  reducers: {
    fetchShopsLocal(state, action) {
      state.ingredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = shopSlice.actions;
export default shopSlice.reducer;
