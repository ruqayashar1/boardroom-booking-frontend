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

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="home" element={<HomePage />}>
        <Route index element={<BoardRooms />} />
        <Route path="add-boardroom" element={<AddBoardRoomForm />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="live-meetings" element={<LiveMeetings />} />
        <Route path="locked" element={<LockedRooms />} />
        <Route path="upcoming" element={<UpcomingMeeting />} />
      </Route>
    </Routes>
  );
};

export default Layout;
