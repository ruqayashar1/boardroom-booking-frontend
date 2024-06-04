import React from "react";
import Header from "../../ components/header/Header";
import { NavLink, Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Header />
      <main id="main">
        <section
          id="navigation-area"
          className="flex justify-between flex-wrap gap-2 min-h-[6rem] bg-white bg-opacity-[5%] my-4 shadow p-4"
        >
          <NavLink
            to="/home"
            className="w-max h-10 bg-[#daf3f5] flex shadow justify-between items-center rounded-[5px] px-4 bg-opacity-40"
          >
            <span className="material-symbols-outlined mr-2">meeting_room</span>
            <h4 className="font-bold uppercase text-xs">Boardrooms</h4>
          </NavLink>
          <NavLink
            to="add-boardroom"
            className="w-max h-10 bg-[#D9D9D9] flex shadow-md justify-between items-center rounded-[5px] px-4 bg-opacity-40"
          >
            <span className="material-symbols-outlined mr-2">add</span>
            <h4 className="font-bold uppercase text-xs">Add Boardroom</h4>
          </NavLink>
          <NavLink
            to="reservations"
            className="w-max h-10 bg-[#D9D9D9] flex shadow-md justify-between items-center rounded-[5px] px-4 bg-opacity-40"
          >
            <span className="material-symbols-outlined mr-2">event_seat</span>
            <h4 className="font-bold uppercase text-xs">Reservations</h4>
          </NavLink>
          <NavLink
            to="live-meetings"
            className="w-max h-10 bg-[#D9D9D9] flex shadow-md justify-between items-center rounded-[5px] px-4 bg-opacity-40"
          >
            <span className="material-symbols-outlined mr-2">groups</span>
            <h4 className="font-bold uppercase text-xs">Live Meeting</h4>
          </NavLink>
          <NavLink
            to="locked"
            className="w-max h-10 bg-[#D9D9D9] flex shadow-md justify-between items-center rounded-[5px] px-4 bg-opacity-40"
          >
            <span className="material-symbols-outlined mr-2">lock</span>
            <h4 className="font-bold uppercase text-xs">Locked</h4>
          </NavLink>
          <NavLink
            to="upcoming"
            className="w-max h-10 bg-[#D9D9D9] flex shadow-md justify-between items-center rounded-[5px] px-4 bg-opacity-40"
          >
            <span className="material-symbols-outlined mr-2">upcoming</span>
            <h4 className="font-bold uppercase text-xs">Upcoming Meetings</h4>
          </NavLink>
        </section>
        <Outlet />
      </main>
    </>
  );
};

export default HomePage;
