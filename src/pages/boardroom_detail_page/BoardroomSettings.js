import React, { useRef } from "react";
import { useClickAway } from "react-use";

const BoardroomSettings = ({ toggleFuncs, isRoomLocked = false }) => {
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
        className="hidden w-max bg-white h-max mt-2 absolute top-10 right-0 z-10 shadow-lg transition-all duration-300"
      >
        <div className="p-2 flex justify-between items-center bg-[#06ABDD] text-white">
          <h3 className="mr-10">Settings</h3>
          <span
            onClick={toggleBoardromSettingsPopup}
            className="material-symbols-outlined cursor-pointer hover:rotate-90 transition-transform duration-200"
          >
            close
          </span>
        </div>
        {/** Reusable item styling */}
        {[
          {
            label: "Add Admin",
            icon: "person_add",
            action: toggleFuncs.toggleAdminForm,
          },
          {
            label: "Add Equipment",
            icon: "add",
            action: toggleFuncs.toggleEquipmentForm,
          },
          {
            label: "Make Reservation",
            icon: "add",
            action: toggleFuncs.toggleReservationForm,
          },
          {
            label: "Update Boardroom",
            icon: "update",
            action: toggleFuncs.navigateToUpdateForm,
          },
          {
            label: "Add Contact",
            icon: "add",
            action: toggleFuncs.toggleBoardroomContact,
          },
        ].map((item, index) => (
          <div
            key={index}
            onClick={item.action}
            className="bg-[#d9d9d9] bg-opacity-[21%] m-1 my-2 flex items-center font-thin font-[Roboto] cursor-pointer rounded hover:bg-[#06ABDE] hover:text-white transition-all duration-300"
          >
            <span
              className={`material-symbols-outlined text-[#26ff26] mr-2 ml-4 py-2`}
            >
              {item.icon}
            </span>
            <h3 className="mr-4">{item.label}</h3>
          </div>
        ))}

        {isRoomLocked ? (
          <div
            onClick={toggleFuncs.toggleUnLockRoomForm}
            className="bg-[#d9d9d9] bg-opacity-[21%] m-1 my-2 flex items-center font-thin font-[Roboto] cursor-pointer rounded hover:bg-[#06ABDE] hover:text-white transition-all duration-300"
          >
            <span className="material-symbols-outlined text-[#DD0606] mr-2 ml-4 py-2">
              lock_open
            </span>
            <h3 className="mr-4">Unlock</h3>
          </div>
        ) : (
          <div
            onClick={toggleFuncs.toggleLockRoomForm}
            className="bg-[#d9d9d9] bg-opacity-[21%] m-1 my-2 flex items-center font-thin font-[Roboto] cursor-pointer rounded hover:bg-[#06ABDE] hover:text-white transition-all duration-300"
          >
            <span className="material-symbols-outlined text-[#DD0606] mr-2 ml-4 py-2">
              lock
            </span>
            <h3 className="mr-4">Lock</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardroomSettings;
