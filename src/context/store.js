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
import equipmentSlice from "./equipments/equipmentSlice";
import boardroomAdminSlice from "./boardroom/boardroomAdminSlice";
import reservationDetailSlice from "./reservation/reservationDetailSlice";
import fileImageSlice from "./upload/uploadFileSlice";
import errorMiddleware from "./middleware";
import usersSlice from "./users/usersSlice";
import notificationSlice from "./notification/notificationSlice";

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
    systemAdmin: currentAdminSlice,
    kemriEmployee: kemriEmployeeSlice,
    equipment: equipmentSlice,
    boardroomAdmin: boardroomAdminSlice,
    selectedReservation: reservationDetailSlice,
    fileImage: fileImageSlice,
    user: usersSlice,
    notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorMiddleware),
});

export default store;
