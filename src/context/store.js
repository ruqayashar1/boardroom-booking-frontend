import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import timezoneSlice from "./timezone/timezoneSlice";
import boardroomSlice from "./boardroom/boardroomSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    timezone: timezoneSlice,
    boardroom: boardroomSlice,
  },
});

export default store;
