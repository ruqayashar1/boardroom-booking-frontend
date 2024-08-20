import React from "react";
import Header from "../../ components/header/Header";
import { NavLink, Outlet } from "react-router-dom";
import useTrackPreviousUrl from "../../hooks/useTrackPreviousUrl";

const HomePage = () => {
  useTrackPreviousUrl();
  return (
    <>
      <Header />
      <main id="main" className="w-full">
        <section
          id="navigation-area"
          className="flex flex-wrap gap-2 min-h-[6rem] bg-white bg-opacity-5 my-4 shadow p-4 justify-evenly items-center"
        >
          <NavLink
            to="/home"
            className="flex items-center gap-2 h-10 bg-[#daf3f5] shadow rounded px-4 bg-opacity-40 text-xs font-bold uppercase"
          >
            <span className="material-symbols-outlined">meeting_room</span>
            <h4>Boardrooms</h4>
          </NavLink>
          <NavLink
            to="add-boardroom"
            className="flex items-center gap-2 h-10 bg-[#D9D9D9] shadow-md rounded px-4 bg-opacity-40 text-xs font-bold uppercase"
          >
            <span className="material-symbols-outlined">add</span>
            <h4>Add Boardroom</h4>
          </NavLink>
          <NavLink
            to="reservations"
            className="flex items-center gap-2 h-10 bg-[#D9D9D9] shadow-md rounded px-4 bg-opacity-40 text-xs font-bold uppercase"
          >
            <span className="material-symbols-outlined">event_seat</span>
            <h4>Reservations</h4>
          </NavLink>
          <NavLink
            to="live-meetings"
            className="flex items-center gap-2 h-10 bg-[#D9D9D9] shadow-md rounded px-4 bg-opacity-40 text-xs font-bold uppercase"
          >
            <span className="material-symbols-outlined">groups</span>
            <h4>Continuing Meetings</h4>
          </NavLink>
          <NavLink
            to="locked"
            className="flex items-center gap-2 h-10 bg-[#D9D9D9] shadow-md rounded px-4 bg-opacity-40 text-xs font-bold uppercase"
          >
            <span className="material-symbols-outlined">lock</span>
            <h4>Locked</h4>
          </NavLink>
          <NavLink
            to="upcoming"
            className="flex items-center gap-2 h-10 bg-[#D9D9D9] shadow-md rounded px-4 bg-opacity-40 text-xs font-bold uppercase"
          >
            <span className="material-symbols-outlined">upcoming</span>
            <h4>Upcoming Meetings</h4>
          </NavLink>
        </section>
        <Outlet />
      </main>
    </>
  );
};

export default HomePage;
