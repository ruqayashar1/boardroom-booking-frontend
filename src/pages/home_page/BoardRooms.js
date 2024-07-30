import React from "react";
import BoardroomFilterPopup from "./BoardroomFilterPopup";
import BoardroomImage from "../../assets/boardroom-img.jpg";
import BoardRoomCard from "./BoardRoomCard";

const BoardRooms = () => {
  return (
    <section id="boardrooms" className="w-full relative">
      <BoardroomFilterPopup />
      <div id="all-boardrooms" className="p-4 grid lg:grid-cols-3 gap-10">
        <BoardRoomCard
          key="1"
          boardroomImage={BoardroomImage}
          hasInternet={false}
        />
        <BoardRoomCard key="2" boardroomImage={BoardroomImage} locked={true} />
        <BoardRoomCard
          key="3"
          boardroomImage={BoardroomImage}
          anyLiveMeeting={true}
        />
      </div>
    </section>
  );
};

export default BoardRooms;
