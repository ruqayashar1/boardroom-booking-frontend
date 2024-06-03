import React from "react";
import BoardroomFilterPopup from "./BoardroomFilterPopup";

const BoardRooms = () => {
  return (
    <section id="boadrooms" className="w-[100%] relative">
      <BoardroomFilterPopup />
      <div id="all-boardrooms" className="p-4">
        <div id="boardroom-card">
          {/* do changes here by styling it, use only tailwindcss */}
          boardroom card
        </div>
      </div>
    </section>
  );
};

export default BoardRooms;
