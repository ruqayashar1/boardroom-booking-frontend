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
import BoardroomEquipment from "../pages/boardroom_detail_page/BoardroomEquipment";
import BoardroomAdminDetails from "../pages/boardroom_detail_page/BoardroomAdminDetails";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useSelector } from "react-redux";
import ReservationDetailPage from "../pages/reservation_detail_page/ReservationDetailPage";
import SystemAdminsPage from "../pages/system_admins_page/SystemAdminsPage";
import UserTimezonePage from "../pages/UserTimezonePage";

const Layout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home"
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
        path="boardrooms/:id"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <BoardRoomDetailPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<BoardroomReservations />} />
        <Route
          path="archived-reservations"
          element={<BoardroomArchivedReservations />}
        />
        <Route path="equipments" element={<BoardroomEquipment />} />
        <Route path="admin-info" element={<BoardroomAdminDetails />} />
      </Route>
      <Route path="/reservations/:tag" element={<ReservationDetailPage />} />
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
    </Routes>
  );
};

export default Layout;
