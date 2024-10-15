import React, { useEffect } from "react";
import MessageCard from "./MessageCard";
import { useDispatch, useSelector } from "react-redux";

import EmptyBoxMessage from "../../components/EmptyBoxMessager";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";
import { fetchNotifications } from "../../context/notification/notificationSlice";

const Notifications = ({ notificationPaneRef, openNotificationPopUp }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const isLoading = useSelector((state) => state.notification.isLoading);
  const fetchNotificationsFromServer = () => {
    dispatch(fetchNotifications());
  };

  useEffect(() => {
    fetchNotificationsFromServer();
  }, []);
  return (
    <div
      ref={notificationPaneRef}
      id="notification-pane-popup"
      className="p-4 hidden w-full max-w-md h-max bg-white absolute z-20 top-[75px] right-0 shadow-md hover:shadow-lg"
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
      <div className="my-4 max-h-[60vh] bg-gray-50 p-2 w-full overflow-y-scroll no-scrollbar">
        {notifications.length === 0 && !isLoading ? (
          <EmptyBoxMessage displayText="Empty Box!" />
        ) : isLoading ? (
          <LoaderIndicator />
        ) : (
          notifications.map((notification) => (
            <MessageCard key={notification?.id} notification={notification} />
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
