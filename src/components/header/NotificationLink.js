import React from "react";
import { useSelector } from "react-redux";

const Notification = ({ openNotificationPopUp }) => {
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const getNumOfUnreadNotification = (notifications) => {
    return notifications.length === 0
      ? 0
      : notifications.filter((notification) => !notification.isRead).length;
  };

  const numberOfUnreadNotification = getNumOfUnreadNotification(notifications);

  return (
    <div
      onClick={openNotificationPopUp}
      id="notication-area"
      className="flex items-center justify-center relative h-10 w-10 bg-[#E4E6EB]  opacity-70 rounded-full cursor-pointer hover:opacity-100"
    >
      <span className="material-symbols-outlined">notifications</span>
      {numberOfUnreadNotification > 0 ? (
        <div className="w-5 h-5 rounded-full bg-[#E41E3F] flex items-center justify-center absolute -top-2 -right-1">
          <h4 className="text-center text-white font">
            {numberOfUnreadNotification}
          </h4>
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
