import React from "react";
import { NavLink } from "react-router-dom";

const BoardRoomCard = ({
  boardroomImage,
  locked = false,
  hasInternet = true,
}) => {
  return (
    <NavLink className="boardroom-card cursor-pointer">
      <img
        src={boardroomImage}
        alt="boardroom"
        className="h-32 sm:h-48 w-full object-cover"
      />
      <div className="mx-2 my-6">
        <span className="block font-bold w-full text-sm">CBRD Boardroom</span>
        <div className="flex mt-2">
          {hasInternet ? (
            <span className="material-symbols-outlined block text-green-500 text-sm mr-2">
              wifi
            </span>
          ) : (
            <span className="material-symbols-outlined block text-red-500 text-sm mr-2">
              wifi
            </span>
          )}
          <span className="block text-gray-500 text-sm">Wifi</span>
        </div>
      </div>
      <div className="capacity-badge">
        <span> Capacity 25</span>
      </div>
      {locked ? (
        <span className="boardroom-not-available">Locked</span>
      ) : (
        <span className="boardroom-available">Available</span>
      )}
    </NavLink>
  );
};

export default BoardRoomCard;
