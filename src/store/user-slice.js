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
        favorite_ingredients: [],
      };
      return { ...data, favorited };
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
        favorite_ingredients: [],
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

const defaultState = {
  userProfile: { favorited: { favorite_shops: [], favorite_ingredients: [] } },
  userId: null,
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
      });
  },
});

export const { updateUserProfileLocal, setUserId } = usersSlice.actions;
export default usersSlice.reducer;
