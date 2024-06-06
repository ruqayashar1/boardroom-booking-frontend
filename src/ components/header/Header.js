import React, { useRef, useState } from "react";
import Logo from "./Logo";
import Notification from "./NotificationLink";
import Notifications from "./Notifications";

const Header = () => {
  const [numberOfNotifications, setNumberOfNotifications] = useState(4);
  const notificationPaneRef = useRef();
  const openNotificationPopUp = (e) => {
    e.preventDefault();
    notificationPaneRef.current.classList.toggle("hidden");
    setNumberOfNotifications(0);
  };
  return (
    <header
      id="header"
      className="flex justify-between items-center h-[70px] p-2 shadow-sm sticky top-0 z-30 bg-white"
    >
      <Logo />
      <div
        id="right-area"
        className="flex justify-between items-center md:w-[400px] gap-1"
      >
        <Notification
          numberOfNotifications={numberOfNotifications}
          openNotificationPopUp={openNotificationPopUp}
        />
        <h3 className="font-bold cursor-pointer text-[#06ABDD] p-1 rounded-sm transition duration-1000 ease-out hover:bg-[#f3f3f3]">
          BOARDROOMS
        </h3>
        <div
          id="user-profile"
          className="flex font-[Inter] cursor-pointer opacity-70 hover:opacity-100"
        >
          <span className="material-symbols-outlined">person</span>
          <h3 className="font-bold opacity-80">Rukia</h3>
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </div>
      </div>
      <Notifications
        notificationPaneRef={notificationPaneRef}
        openNotificationPopUp={openNotificationPopUp}
      />
    </header>
  );
};

export default Header;
