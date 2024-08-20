import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import timezoneSlice from "./timezone/timezoneSlice";
import boardroomSlice from "./boardroom/boardroomSlice";
import reservationSlice from "./reservation/reservationSlice";
import upcomingMeetingSlice from "./reservation/upcomingMeetingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    timezone: timezoneSlice,
    boardroom: boardroomSlice,
    reservation: reservationSlice,
    upcomingMeeting: upcomingMeetingSlice,
  },
});

export default store;
