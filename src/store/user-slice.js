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

const defaultState = {
  userProfile: {},
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
      });
  },
});

export const { updateUserProfileLocal, setUserId } = usersSlice.actions;
export default usersSlice.reducer;
