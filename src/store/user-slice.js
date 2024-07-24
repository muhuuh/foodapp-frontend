import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase/supabase";

// Async thunk to fetch user profile from the database
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Ensure favorited is properly initialized if it's null
      const favorited = data.favorited || {
        favorite_shops: [],
        favorite_recipes: [],
      };
      return { ...data, favorited };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to fetch favorite shops by their IDs
export const fetchFavoriteShops = createAsyncThunk(
  "user/fetchFavoriteShops",
  async (shopIds, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("store")
        .select("*")
        .in("id", shopIds);

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
export const updateUserProfileInDB = createAsyncThunk(
  "user/updateUserProfileInDB",
  async (profileData, { rejectWithValue }) => {
    try {
      const { id, ...updateData } = profileData;
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

export const toggleFavoriteShop = createAsyncThunk(
  "user/toggleFavoriteShop",
  async ({ userId, shopId }, { getState, rejectWithValue }) => {
    try {
      const { userProfile } = getState().users;
      const favorited = userProfile.favorited || {
        favorite_shops: [],
        favorite_recipes: [],
      };

      let updatedFavorites = [...favorited.favorite_shops];

      if (updatedFavorites.includes(shopId)) {
        updatedFavorites = updatedFavorites.filter((id) => id !== shopId);
      } else {
        updatedFavorites.push(shopId);
      }

      const { data, error } = await supabase
        .from("user_profiles")
        .update({
          favorited: {
            ...favorited,
            favorite_shops: updatedFavorites,
          },
        })
        .eq("id", userId)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error("No data returned from the update operation");
      }

      return { favorite_shops: updatedFavorites };
    } catch (err) {
      console.error("Error in toggleFavoriteShop:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const toggleFavoriteRecipe = createAsyncThunk(
  "user/toggleFavoriteRecipe",
  async ({ userId, recipeId }, { getState, rejectWithValue }) => {
    try {
      const { userProfile } = getState().users;
      console.log("UserProfile:", userProfile);

      const favorited = userProfile.favorited || {
        favorite_shops: [],
        favorite_recipes: [],
      };

      let updatedFavorites = Array.isArray(favorited.favorite_recipes)
        ? [...favorited.favorite_recipes]
        : [];

      if (updatedFavorites.includes(recipeId)) {
        updatedFavorites = updatedFavorites.filter((id) => id !== recipeId);
      } else {
        updatedFavorites.push(recipeId);
      }

      const { data, error } = await supabase
        .from("user_profiles")
        .update({
          favorited: {
            ...favorited,
            favorite_recipes: updatedFavorites,
          },
        })
        .eq("id", userId)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return { favorite_recipes: updatedFavorites };
    } catch (err) {
      console.error("Error in toggleFavoriteRecipe:", err);
      return rejectWithValue(err.message);
    }
  }
);

const defaultState = {
  userProfile: { favorited: { favorite_shops: [], favorite_recipes: [] } },
  userId: null,
  favorites: {
    recipes: [],
    shops: [],
    loading: false,
    error: null,
  },
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    updateUserProfileLocal(state, action) {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfileInDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfileInDB.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfileInDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFavoriteShop.fulfilled, (state, action) => {
        state.userProfile.favorited.favorite_shops =
          action.payload.favorite_shops;
      })
      .addCase(toggleFavoriteRecipe.fulfilled, (state, action) => {
        state.userProfile.favorited.favorite_recipes =
          action.payload.favorite_recipes;
      })
      .addCase(fetchFavoriteShops.pending, (state) => {
        state.favorites.loading = true;
        state.favorites.error = null;
      })
      .addCase(fetchFavoriteShops.fulfilled, (state, action) => {
        state.favorites.loading = false;
        state.favorites.shops = action.payload;
      })
      .addCase(fetchFavoriteShops.rejected, (state, action) => {
        state.favorites.loading = false;
        state.favorites.error = action.payload;
      });
  },
});

export const { updateUserProfileLocal, setUserId } = usersSlice.actions;
export default usersSlice.reducer;
