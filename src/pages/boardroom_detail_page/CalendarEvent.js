import { format } from "date-fns";
import React, { useState } from "react";

const CalendarEvent = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const approvalStatus = {
    APPROVED: ["APPROVED", "bg-[#06ABDD]"],
    PENDING: ["PENDING", "bg-[#DDC706]"],
    DECLINED: ["DECLINED", "bg-[#DD0606]"],
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`p-2 min-h-8 cursor-pointer ${
          approvalStatus[event.approvalStatus][1]
        }`}
        onClick={handleOpenModal}
      >
        <p className="text-xs mt-1">Type: {event.meetingType}</p>
        <p className="text-xs">Reserved By: {event.reservedBy}</p>
        <p className="text-xs">Boardroom: {event.boardroomName}</p>
      </div>

      {isModalOpen && (
        <div className="text-[#000] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 !z-50">
          <div className="bg-white p-4 rounded shadow w-80 z-50">
            <div
              className={`h-6 ${
                approvalStatus[event.approvalStatus][1]
              } flex justify-center items-center`}
            >
              <p className="text-white font-semibold">{event.approvalStatus}</p>
            </div>
            <h3 className="text-sm font-bold mb-4 mt-2 w-full text-wrap">
              {event.title}
            </h3>
            <p className="text-sm">
              <strong>Type:</strong> {event.meetingType}
            </p>
            <p className="text-sm">
              <strong>Start:</strong>{" "}
              {format(event.start, "MMMM dd, yyyy hh:mm a")}
            </p>
            <p className="text-sm">
              <strong>End:</strong> {format(event.end, "MMMM dd, yyyy hh:mm a")}
            </p>
            <p className="text-sm">
              <strong>Reserved By:</strong> {event.reservedBy}
            </p>
            <p className="text-sm">
              <strong>Boardroom:</strong> {event.boardroomName}
            </p>
            {event.approvalStatus === "DECLINED" && (
              <p className="text-sm mt-3 shadow bg-gray-50 p-2">
                <strong>Declination Message:</strong>{" "}
                {event.cancellationMessage}
              </p>
            )}
            <button
              onClick={handleCloseModal}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarEvent;
