import React, { useRef, useState } from "react";
import Logo from "./Logo";
import Notification from "./NotificationLink";
import Notifications from "./Notifications";
import { NavLink } from "react-router-dom";
import { useClickAway } from "react-use";
import UserProfilePopup from "./UserProfilePopup";
import { useSelector } from "react-redux";

const Header = () => {
  const authUser = useSelector((state) => state.auth.user);
  const [userPopupOpen, setUserPopupOpen] = useState(false);
  const [numberOfNotifications, setNumberOfNotifications] = useState(4);
  const notificationPaneRef = useRef();
  const openNotificationPopUp = (e) => {
    e.preventDefault();
    notificationPaneRef.current.classList.toggle("hidden");
    setNumberOfNotifications(0);
  };

  useClickAway(notificationPaneRef, () => {
    const hidden = notificationPaneRef.current.classList.toggle("hidden");
    if (!hidden) {
      notificationPaneRef.current.classList.add("hidden");
    }
  });

  const toggleUserProfilePopup = (e) => {
    e.preventDefault();
    setUserPopupOpen((prev) => !prev);
  };

  const closeUserProfilePopup = (e) => {
    e.preventDefault();
    setUserPopupOpen(false);
  };
  return (
    <header
      id="header"
      className="flex flex-col md:flex-row justify-between items-center h-auto md:h-[70px] p-4 md:p-2 shadow-sm sticky top-0 z-30 bg-white"
    >
      <Logo />
      <div
        id="right-area"
        className="flex flex-col md:flex-row justify-between items-center w-full md:w-[400px] gap-2 md:gap-4"
      >
        <Notification
          numberOfNotifications={numberOfNotifications}
          openNotificationPopUp={openNotificationPopUp}
        />
        <NavLink
          to="/home"
          className="font-bold cursor-pointer text-[#06ABDD] p-2 rounded-sm transition duration-300 ease-out hover:bg-[#f3f3f3]"
        >
          BOARDROOMS
        </NavLink>
        <div
          onClick={toggleUserProfilePopup}
          id="user-profile"
          className="flex items-center font-[Inter] cursor-pointer opacity-70 hover:opacity-100 gap-2"
        >
          <span className="material-symbols-outlined">person</span>
          <h3 className="font-bold opacity-80 text-sm md:text-base">
            {authUser?.username}
          </h3>
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </div>
      </div>
      {userPopupOpen ? (
        <UserProfilePopup
          closeUserProfilePopup={closeUserProfilePopup}
          setUserPopupOpen={setUserPopupOpen}
        />
      ) : null}
      <Notifications
        notificationPaneRef={notificationPaneRef}
        openNotificationPopUp={openNotificationPopUp}
      />
    </header>
  );
};

export default Header;
