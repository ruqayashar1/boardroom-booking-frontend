import React from "react";
import { Bars } from "react-loader-spinner";
import { NavLink } from "react-router-dom";

const BoardroomLockedCard = ({
  boardroomImage,
  locked = false,
  hasInternet = true,
  anyLiveMeeting = false,
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
        {locked ? (
          <span className="block w-full text-sm bg-red-100 p-2 mt-2">
            It is under renovation
          </span>
        ) : null}
        <div className=" w-[50%] flex mt-2 justify-between items-center">
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
          {anyLiveMeeting ? (
            <Bars
              height="30"
              width="30"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : null}
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

export default BoardroomLockedCard;
