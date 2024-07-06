// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./user-slice";

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

export default store;
