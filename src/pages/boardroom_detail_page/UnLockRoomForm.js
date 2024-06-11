import React from "react";

const UnLockRoomForm = ({ toggleUnLockRoomForm }) => {
  return (
    <aside
      id="unlock-room-popup"
      className="w-[50%] h-[500px] shadow shadow-slate-500 absolute bg-white top-16 left-0 z-10"
    >
      <div className="w-full h-8 bg-[#06ABDD] text-white font-bold flex justify-between items-center px-2">
        <h3>UNLOCK ROOM</h3>
        <span
          onClick={toggleUnLockRoomForm}
          title="close"
          className="material-symbols-outlined cursor-pointer hover:bg-slate-700 pr-0 opacity-80 transition-all duration-500 line-clamp-4"
        >
          close
        </span>
      </div>
      {/* write your code here */}
    </aside>
  );
};

export default UnLockRoomForm;
