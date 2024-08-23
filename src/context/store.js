import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import timezoneSlice from "./timezone/timezoneSlice";
import boardroomSlice from "./boardroom/boardroomSlice";
import reservationSlice from "./reservation/reservationSlice";
import upcomingMeetingSlice from "./reservation/upcomingMeetingSlice";
import liveMeetingSlice from "./reservation/liveMeetingSlice";
import lockedBoardroomMessageSlice from "./boardroom/lockedBoardroomMessageSlice";
import lockedBoardroomSLice from "./boardroom/lockedBoardroomSLice";
import boardroomReservationSlice from "./reservation/boardroomReservationSlice";
import selectedBoardroomSlice from "./boardroom/selectedBoardroomSlice";
import currentAdminSlice from "./users/systemAdminsSLice";
import kemriEmployeeSlice from "./users/kemriEmployeeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    timezone: timezoneSlice,
    boardroom: boardroomSlice,
    reservation: reservationSlice,
    upcomingMeeting: upcomingMeetingSlice,
    liveMeeting: liveMeetingSlice,
    lockedBoardroomMessage: lockedBoardroomMessageSlice,
    lockedBoardroom: lockedBoardroomSLice,
    boardroomReservation: boardroomReservationSlice,
    selectedBoardroom: selectedBoardroomSlice,
    currentAdmin: currentAdminSlice,
    kemriEmployee: kemriEmployeeSlice,
  },
});

export default store;
