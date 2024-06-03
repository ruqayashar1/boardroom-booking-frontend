import React from "react";

const Notifications = ({ notificationPaneRef, openNotificationPopUp }) => {
  return (
    <div
      ref={notificationPaneRef}
      id="notification-pane-popup"
      className="hidden w-96 h-56 absolute z-10 top-[75px] right-0 shadow-md hover:shadow"
    >
      <div className="w-full h-8 bg-[#06ABDD] text-white font-bold flex justify-between items-center px-2">
        <h3>NOTIFICATIONS</h3>
        <span
          onClick={openNotificationPopUp}
          title="close"
          className="material-symbols-outlined cursor-pointer hover:bg-slate-700 pr-0 opacity-80 transition-all duration-500 line-clamp-4"
        >
          close
        </span>
        {/* write your code here */}
      </div>
    </div>
  );
};

export default Notifications;
