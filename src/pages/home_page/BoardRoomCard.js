import React from "react";
import { Bars } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import { base64ToUrl } from "../../functions";
import BoardroomImage from "./BoardroomImage";

const BoardRoomCard = ({ boardroom }) => {
  const decodedUrl = base64ToUrl(boardroom?.picture);
  return (
    <NavLink to="/boardrooms/1" className="boardroom-card cursor-pointer">
      <BoardroomImage base64String={boardroom.picture} />
      <div className="mx-2 my-6">
        <span className="block font-bold w-full text-sm">
          {boardroom?.name}
        </span>
        <div className=" w-[50%] flex mt-2 justify-between items-center">
          <div className="flex mt-2">
            {boardroom?.internetEnabled ? (
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
          {boardroom?.hasOngoingMeeting && !boardroom?.locked ? (
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
        <span>{`Capacity ${boardroom?.capacity}`}</span>
      </div>
      {boardroom?.locked ? (
        <span className="boardroom-not-available">Locked</span>
      ) : (
        <span className="boardroom-available">Available</span>
      )}
    </NavLink>
  );
};

export default BoardRoomCard;
