import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user-slice";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
