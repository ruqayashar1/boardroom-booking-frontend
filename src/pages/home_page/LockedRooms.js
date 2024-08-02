import React from "react";
import BoardroomImage from "../../assets/boardroom-img.jpg";
import BoardroomLockedCard from "./BoardroomLockedCard";

const LockedRooms = () => {
  return (
    <div
      id="locked-rooms"
      className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
    >
      <BoardroomLockedCard boardroomImage={BoardroomImage} locked={true} />
      <BoardroomLockedCard boardroomImage={BoardroomImage} locked={true} />
      <BoardroomLockedCard boardroomImage={BoardroomImage} locked={true} />
    </div>
  );
};

export default LockedRooms;
