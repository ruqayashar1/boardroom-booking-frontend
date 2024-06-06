import React from "react";
import Header from "../../ components/header/Header";
import { Bars } from "react-loader-spinner";
import boardroomImage from "../../assets/boardroom-img.jpg";
import BoardroomSettings from "./BoardroomSettings";
import { NavLink, Outlet } from "react-router-dom";

const BoardRoomDetailPage = () => {
  return (
    <>
      <Header />
      <main id="main" className="relative">
        <div className="w-[100%] h-max flex justify-between my-2 bg-[#f7f7f7] pr-4 items-center shadow-sm rounded-[0.4rem]">
          <div className="w-[90%] h-[100%] bg-gradient-to-tr from-[#06ABDE] to-[#8fdef8] bg-opacity-50 mr-2 p-2 text-white font-[Inter]">
            <h2 className="text-sm ml-4 font-bold">CBRD BOARDROOM</h2>
            <span className="ml-4">
              This boardroom is available for booking
            </span>
          </div>
          <div className="mr-0">
            <Bars
              height="30"
              width="100"
              color="#00ff00"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass="bg-white shadow-sm"
              visible={true}
            />
          </div>
        </div>
        <section
          id="boardroom-basic-info"
          className="flex justify-between mb-6"
        >
          <div id="boardroom-image" className="w-[49%] h-[100%]">
            <img
              src={boardroomImage}
              alt="boardroom"
              className=" w-[100%] h-[100%] opacity-70 rounded-sm shadow-md brightness-90"
            />
          </div>
          <div
            id="description-section"
            className="w-[49%] font-[Inter] flex flex-col justify-between relative"
          >
            <div id="top-info" className="p-3 shadow-md mb-2">
              <div className="flex justify-between  items-center mb-5">
                <h3 className="font-semibold drop-shadow-md">
                  Capacity <b>80</b>
                </h3>
                <div className="flex justify-center text-[#00ff00]">
                  <span className="material-symbols-outlined mr-2">wifi</span>
                  <h3>Enabled</h3>
                </div>
                <BoardroomSettings />
              </div>
              <div className="flex justify-center mb-5">
                <div className="mr-24">
                  <h3 className="font-bold text-sm mb-2 opacity-50">
                    Supports
                  </h3>
                  <ul className="text-sm font-thin italic">
                    <li>Physical</li>
                    <li>Hybrid</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-2 opacity-50">
                    Phone Extension
                  </h3>
                  <ul className="text-sm italic">
                    <li>214</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-2 font-[Roboto]">
                <p>
                  The boardroom, located on the 10th floor, is a
                  state-of-the-art facility designed for high-level executive
                  meetings, strategic planning sessions, and important
                  presentations. Equipped with cutting-edge technology, the room
                  features a large conference table that can comfortably seat up
                </p>
              </div>
            </div>
            <div
              id="bottom-info"
              className="w-[100%] h-max bg-gradient-to-tr from-[#06ABDE] to-[#a4e9e0] rounded-sm"
            >
              <button className="w-[100%] p-2 text-center font-bold text-white rounded-sm shadow-md">
                Make Reservation
              </button>
            </div>
          </div>
        </section>
        <section
          id="boardroom-navigation-area"
          className="font-[Roboto] flex mb-10"
        >
          <NavLink
            to=""
            className="w-max h-8 bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9] bg-[#d9d9d9] bg-opacity-50 flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer mr-4"
          >
            <h3 className="font-bold text-sm">Reservations</h3>
          </NavLink>
          <NavLink
            to="archived-reservations"
            className="w-max h-8 bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9] bg-[#d9d9d9] bg-opacity-50 flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer mr-4"
          >
            <h3 className="font-bold text-sm">Archived Reservations</h3>
          </NavLink>
          <NavLink
            to="equipments"
            className="w-max h-8 bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9] bg-[#d9d9d9] bg-opacity-50 flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer mr-4"
          >
            <h3 className="font-bold text-sm">Equipment</h3>
          </NavLink>
          <NavLink
            to="admin-info"
            className="w-max h-8 bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9] bg-[#d9d9d9] bg-opacity-50 flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer mr-4"
          >
            <h3 className="font-bold text-sm">Admin Info</h3>
          </NavLink>
        </section>
        <Outlet />
      </main>
    </>
  );
};

export default BoardRoomDetailPage;
