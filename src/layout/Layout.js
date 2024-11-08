import React from "react";
import HomePage from "../pages/home_page/HomePage";
import LoginPage from "../pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import BoardRooms from "../pages/home_page/BoardRooms";
import AddBoardRoomForm from "../pages/home_page/AddBoardRoomForm";
import Reservations from "../pages/home_page/Reservations";
import LiveMeetings from "../pages/home_page/LiveMeetings";
import LockedRooms from "../pages/home_page/LockedRooms";
import UpcomingMeeting from "../pages/home_page/UpcomingMeeting";
import BoardRoomDetailPage from "../pages/boardroom_detail_page/BoardRoomDetailPage";
import BoardroomReservations from "../pages/boardroom_detail_page/BoardroomReservations";
import BoardroomArchivedReservations from "../pages/boardroom_detail_page/BoardroomArchivedReservations";
import BoardroomEquipments from "../pages/boardroom_detail_page/BoardroomEquipments";
import BoardroomAdminDetails from "../pages/boardroom_detail_page/BoardroomAdminDetails";
import ProtectedRoute from "../routes/ProtectedRoute";
import ReservationDetailPage from "../pages/reservation_detail_page/ReservationDetailPage";
import SystemAdminsPage from "../pages/system_admins_page/SystemAdminsPage";
import UserTimezonePage from "../pages/UserTimezonePage";
import NotFoundPage from "../pages/NotFoundPage";
import useFetchAllBoardrooms from "../hooks/context/useFetchAllBoardrooms";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import useSockjsConnection from "../hooks/useSockjsConnection";
import { useDispatch } from "react-redux";
import { addNotification } from "../context/notification/notificationSlice";
import ReservationBigCalendar from "../pages/boardroom_detail_page/ReservationBigCalendar";

const Layout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, tag, isAuthenticatedUserAdmin } =
    useAuthenticatedUser();

  const onAdminRoomNotification = (notification) => {
    dispatch(addNotification(notification));
  };
  const onUserPrivateNotification = (notification) => {
    dispatch(addNotification(notification));
  };
  useSockjsConnection(
    tag,
    isAuthenticated,
    isAuthenticatedUserAdmin,
    onAdminRoomNotification,
    onUserPrivateNotification
  );
  useFetchAllBoardrooms();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <HomePage />
          </ProtectedRoute>
        }
      >
        <Route index element={<BoardRooms />} />
        <Route path="add-boardroom" element={<AddBoardRoomForm />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="live-meetings" element={<LiveMeetings />} />
        <Route path="locked" element={<LockedRooms />} />
        <Route path="upcoming" element={<UpcomingMeeting />} />
      </Route>
      <Route
        path="boardrooms/:boardroomTag"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <BoardRoomDetailPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<ReservationBigCalendar />} />
        <Route path="reservations" element={<BoardroomReservations />} />
        <Route
          path="archived-reservations"
          element={<BoardroomArchivedReservations />}
        />
        <Route path="equipments" element={<BoardroomEquipments />} />
        <Route path="admin-info" element={<BoardroomAdminDetails />} />
      </Route>
      <Route
        path="/reservations/:reservationTag"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ReservationDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/system-adms"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <SystemAdminsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-timezone"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <UserTimezonePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Layout;
