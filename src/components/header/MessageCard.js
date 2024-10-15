import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { getHumanFriendlyDateTime } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import {
  markNotificationAsRead,
  setUpdatingNotification,
} from "../../context/notification/notificationSlice";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";

const MessageCard = ({ notification }) => {
  const { authUserId } = useAuthenticatedUser();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const updating = useSelector(
    (state) => state.notification.updating?.[notification?.id]
  );

  const [date, time] = getHumanFriendlyDateTime(notification?.createdAt);

  const markNotificationAsReadFromServer = (notificationId) => {
    dispatch(setUpdatingNotification({ id: notificationId, updating: true }));
    setTimeout(() => {
      dispatch(markNotificationAsRead(notificationId));
    }, 1000);
  };

  return (
    <div className="w-full max-w-full sm:max-w-md mx-auto my-4">
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : "8rem" }}
        className={`${
          notification?.isRead || !notification?.recipient.includes(authUserId)
            ? "bg-white"
            : "bg-blue-50"
        } border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="p-2">
          <h1 className="text-lg sm:text-lg font-bold">
            {notification?.boardroomName}
          </h1>
        </div>

        <div className="p-4">
          <div className="flex justify-between text-gray-500 text-xs sm:text-sm">
            <span>{date}</span>
            <span>{time}</span>
          </div>
          <h2 className="text-base sm:text-sm font-semibold mt-2">
            {notification?.title}
          </h2>
        </div>

        {isOpen && (
          <div className="px-4 pb-4">
            <p className="text-gray-700 text-sm sm:text-base">
              {notification?.message}
            </p>
            <div className="mt-4 text-gray-500 text-xs sm:text-sm">
              <span>Booked by: </span>
              <span className="font-semibold">
                {notification?.createdBy}
              </span> - <span>{notification?.createdByEmail}</span>
            </div>
          </div>
        )}

        {notification?.recipient?.includes(authUserId) && (
          <div className="border-t p-4 flex justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              {!notification?.isRead && !updating ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsReadFromServer(notification?.id);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  Mark as read
                </button>
              ) : updating ? (
                <div className="flex items-center space-x-2 text-blue-500">
                  <ColorRing
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                  <span>Saving changes...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-green-500">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>Marked as read</span>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MessageCard;
