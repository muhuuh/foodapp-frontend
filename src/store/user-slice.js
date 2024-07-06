import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase/supabase";

//----------------------Database connection ----------

export const fetchUser = createAsyncThunk();

export const saveData = createAsyncThunk(
  "inventory/saveData",
  async ({ tableName, dataToSave, type, callback }, { getState }) => {
    /*
    const userId = getState().inventory.userId;
    console.log("User ID:", userId);

    let data = null;
    let error = null;
    const id = uuidv4();

    if (type === "newOrder") {
      const { user, sellers, order, total_order_value } = dataToSave;
      console.log("dataToSave");
      console.log(dataToSave);

      const response = await supabase.from(tableName).insert([dataToSave]);

      data = response.data;
      error = response.error;
    }

    if (error) {
      console.error("Error saving data:", error.message);
      throw error;
    } else {
      return { type, data };
    }
      */
  }
);

//----------------------Redux functions----------

const defaultState = {
  userProfil: {},
};

const usersSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    updateUserProfil(state, action) {
      state.userProfil = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      switch (action.payload.type) {
        case "rawData":
          state.fetchUser = action.payload.data;
          break;

        default:
          console.warn(`Unhandled type: ${action.payload.type}`);
      }
    });
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice;
