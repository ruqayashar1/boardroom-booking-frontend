import React from "react";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsUnlocking,
  unLockBoardroom,
} from "../../context/boardroom/selectedBoardroomSlice";

const UnlockBoardroomForm = ({ toggleUnLockRoomForm, boardroom }) => {
  const dispatch = useDispatch();
  const isUnlocking = useSelector(
    (state) => state.selectedBoardroom.isUnlocking
  );

  const handleClick = () => {
    dispatch(setIsUnlocking(true));
    setTimeout(() => {
      const boardroomId = boardroom?.id;
      dispatch(unLockBoardroom(boardroomId));
      toggleUnLockRoomForm();
    }, 2000); // 2-second delay
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 mx-auto relative">
      {/* Description */}
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Do you want to unlock the boardroom? Unlocking makes it possible to make
        reservations.
      </h2>

      {/* Unlock Button */}
      <button
        onClick={handleClick}
        disabled={isUnlocking}
        className="flex items-center justify-center w-full p-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold focus:outline-none transition ease-in-out duration-150"
      >
        {isUnlocking && (
          <TailSpin
            height="24"
            width="24"
            color="#ffffff" // White loader color to contrast with the bluish button
            ariaLabel="loading"
            className="mr-2" // Margin to the right of the loader
          />
        )}
        {isUnlocking ? "Unlocking boardroom..." : "Unlock boardroom"}
      </button>
    </div>
  );
};

export default UnlockBoardroomForm;
