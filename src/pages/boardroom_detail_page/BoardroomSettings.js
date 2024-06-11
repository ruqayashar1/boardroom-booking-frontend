import React, { useRef } from "react";
import { useClickAway } from "react-use";

const BoardroomSettings = ({ toggleFuncs }) => {
  const boardroomSettingRef = useRef();
  const toggleBoardromSettingsPopup = (e) => {
    e.stopPropagation();
    e.preventDefault();
    boardroomSettingRef.current.classList.toggle("hidden");
  };
  useClickAway(boardroomSettingRef, () => {
    const hidden = boardroomSettingRef.current.classList.contains("hidden");
    if (!hidden) {
      boardroomSettingRef.current.classList.add("hidden");
    }
  });
  return (
    <div>
      <div className="cursor-pointer" onClick={toggleBoardromSettingsPopup}>
        <span className="material-symbols-outlined">manufacturing</span>
        <span className="material-symbols-outlined">arrow_drop_down</span>
      </div>
      <div
        ref={boardroomSettingRef}
        id="boardroom-settings"
        className="hidden w-max bg-white h-max mt-2 absolute top-10 right-0 z-10"
      >
        <div className="p-2 flex justify-between items-center bg-[#06ABDD] text-white">
          <h3 className="mr-10">Settings</h3>
          <span
            onClick={toggleBoardromSettingsPopup}
            className="material-symbols-outlined cursor-pointer"
          >
            close
          </span>
        </div>
        <div
          onClick={toggleFuncs.toggleAdminForm}
          className="bg-[#d9d9d9] bg-opacity-[21%] m-1 my-2 flex items-center font-thin font-[Roboto] cursor-pointer rounded"
        >
          <span className="material-symbols-outlined text-[#26ff26] mr-2 ml-4 py-2">
            person_add
          </span>
          <h3 className="mr-4">Add Admin</h3>
        </div>
        <div
          onClick={toggleFuncs.toggleEquipmentForm}
          className="bg-[#d9d9d9] bg-opacity-[21%] m-1 my-2 flex items-center font-thin font-[Roboto] cursor-pointer rounded"
        >
          <span className="material-symbols-outlined text-[#26ff26] mr-2 ml-4 py-2">
            add
          </span>
          <h3 className="mr-4">Add Equipment</h3>
        </div>
        <div className="bg-[#d9d9d9] bg-opacity-[21%] m-1 my-2 flex items-center font-thin font-[Roboto] cursor-pointer rounded">
          <span className="material-symbols-outlined text-[#26ff26] mr-2 ml-4 py-2">
            add
          </span>
          <h3 className="mr-4">Make Reservation</h3>
        </div>
        <div className="bg-[#d9d9d9] bg-opacity-[21%] m-1 my-2 flex items-center font-thin font-[Roboto] cursor-pointer rounded">
          <span className="material-symbols-outlined text-[#DD0606] mr-2 ml-4 py-2">
            lock
          </span>
          <h3 className="mr-4">Lock</h3>
        </div>
      </div>
    </div>
  );
};

export default BoardroomSettings;
