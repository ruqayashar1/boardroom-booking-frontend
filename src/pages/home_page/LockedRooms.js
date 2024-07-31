import React from "react";
import BoardroomImage from "../../assets/boardroom-img.jpg";
import BoardroomLockedCard from "./BoardroomLockedCard";

const LockedRooms = () => {
  return (
    <div id="locked-rooms" className="p-2 grid lg:grid-cols-3 gap-10">
      <BoardroomLockedCard boardroomImage={BoardroomImage} locked={true} />
      <BoardroomLockedCard boardroomImage={BoardroomImage} locked={true} />
      <BoardroomLockedCard boardroomImage={BoardroomImage} locked={true} />
    </div>
  );
};

export default LockedRooms;
