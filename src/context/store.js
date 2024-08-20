import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import timezoneSlice from "./timezone/timezoneSlice";
import boardroomSlice from "./boardroom/boardroomSlice";
import reservationSlice from "./reservation/reservationSlice";
import upcomingMeetingSlice from "./reservation/upcomingMeetingSlice";
import liveMeetingSlice from "./reservation/liveMeetingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    timezone: timezoneSlice,
    boardroom: boardroomSlice,
    reservation: reservationSlice,
    upcomingMeeting: upcomingMeetingSlice,
    liveMeeting: liveMeetingSlice,
  },
});

export default store;
