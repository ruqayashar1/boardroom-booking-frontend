import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useClickAway } from "react-use";
import { deleteToken, getTwoLettersFromName } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../context/auth/authSlice";

const UserProfilePopup = ({ closeUserProfilePopup, setUserPopupOpen }) => {
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const userProfilePopupRef = useRef();
  useClickAway(userProfilePopupRef, () => {
    setUserPopupOpen(false);
  });

  const logoutUser = () => {
    deleteToken();
    dispatch(authenticate(false));
  };
  return (
    <div
      ref={userProfilePopupRef}
      className="w-max max-w-[400px] h-auto absolute top-[75px] right-0 bg-white z-10 shadow rounded-md"
    >
      <div className="flex justify-between items-center border-b-2 bg-[#06ABDD] px-2 py-2">
        <div className="flex items-center gap-2 mr-5 font-[Nunito]">
          <span className="w-7 h-7 rounded-full bg-gray-100 flex justify-center items-center text-sm">
            {getTwoLettersFromName(authUser?.fullName)}
          </span>
          <span className="text-sm text-white uppercase tracking-wide">
            {authUser?.fullName}
          </span>
        </div>
        <svg
          onClick={closeUserProfilePopup}
          className="rounded-full cursor-pointer hover:bg-gray-100 pr-0 opacity-80 transition-all duration-500 line-clamp-4"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
        </svg>
      </div>

      <NavLink
        to="/user-timezone"
        className="text-sm block w-full border-b border-solid border-gray-400 p-3 pb-2 pl-4 transition duration-300 ease-out font-[Inter] hover:bg-gray-100"
      >
        <svg
          className="inline-block"
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#5f6368"
        >
          <path d="M216-600h528v-96H216v96Zm0 0v-96 96Zm0 504q-29.7 0-50.85-21.15Q144-138.3 144-168v-528q0-29 21.5-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29 0 50.5 21.5T816-696v210q-17-7-35.03-11-18.04-4-36.97-6v-25H216v360h250q5 20 13.5 37.5T499-96H216Zm503.77 48Q640-48 584-104.23q-56-56.22-56-136Q528-320 584.23-376q56.22-56 136-56Q800-432 856-375.77q56 56.22 56 136Q912-160 855.77-104q-56.22 56-136 56ZM775-151l34-34-65-65v-86h-48v106l79 79Z" />
        </svg>
        <span className="ml-2">Your timezone</span>
      </NavLink>

      <NavLink
        to="/system-adms"
        className="text-sm block w-full border-b border-solid border-gray-400 p-3 pb-2 pl-4 transition duration-300 ease-out font-[Inter] hover:bg-gray-100"
      >
        <svg
          className="inline-block"
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#5f6368"
        >
          <path d="M672-288q25 0 42.5-17.5T732-348q0-25-17.5-42.5T672-408q-25 0-42.5 17.5T612-348q0 25 17.5 42.5T672-288Zm-.09 120Q704-168 731-184t43-42q-23-13-48.72-19.5t-53.5-6.5q-27.78 0-53.28 7T570-226q16 26 42.91 42 26.91 16 59 16ZM480-96q-133-30-222.5-150.5T168-515v-229l312-120 312 120v221q-22-10-39-16t-33-8v-148l-240-92-240 92v180q0 49 12.5 96t36.5 88.5q24 41.5 58.5 76T425-194q8 23 25.5 48.5T489-98l-4.5 1-4.5 1Zm191.77 0Q592-96 536-152.23q-56-56.22-56-136Q480-368 536.23-424q56.22-56 136-56Q752-480 808-423.77q56 56.22 56 136Q864-208 807.77-152q-56.22 56-136 56ZM480-480Z" />
        </svg>
        <span className="ml-2">System admins</span>
      </NavLink>

      <div
        onClick={logoutUser}
        className="cursor-pointer block w-full text-sm p-3 pb-2 pl-4 transition duration-300 ease-out font-[Inter] hover:bg-gray-100"
      >
        <svg
          className="inline-block"
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#5f6368"
        >
          <path d="M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h264v72H216v528h264v72H216Zm432-168-51-51 81-81H384v-72h294l-81-81 51-51 168 168-168 168Z" />
        </svg>
        <span className="ml-2">Sign out</span>
      </div>
    </div>
  );
};

export default UserProfilePopup;
