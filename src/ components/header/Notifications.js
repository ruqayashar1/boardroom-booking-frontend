import React from "react";

const Notifications = ({ notificationPaneRef, openNotificationPopUp }) => {
  return (
    <div
      ref={notificationPaneRef}
      id="notification-pane-popup"
      className="hidden w-full max-w-md h-56 bg-white absolute z-10 top-[75px] right-0 shadow-md hover:shadow-lg"
    >
      <div className="w-full h-10 bg-[#06ABDD] text-white font-bold flex justify-between items-center px-4">
        <h3>NOTIFICATIONS</h3>
        <span
          onClick={openNotificationPopUp}
          title="close"
          className="material-symbols-outlined cursor-pointer hover:bg-slate-700 opacity-80 transition-all duration-500"
        >
          close
        </span>
      </div>
      {/* Add notification content here */}
    </div>
  );
};

export default Notifications;
