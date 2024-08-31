import React from "react";
import BoardroomForm from "./BoardroomForm";
import PreviousPageButton from "../../components/buttons/PreviousPageButton";
import { useLocation } from "react-router-dom";

const AddBoardRoomForm = () => {
  const location = useLocation();
  const boardroom = location.state || null;

  return (
    <div id="add-boardroom" className="mb-52">
      <div className="flex items-center">
        <PreviousPageButton />
        <div className="w-full h-8 bg-[#06ABDD] text-white font-bold px-2 font-[Roboto] shadow mb-4 ml-10">
          <h4 className="font-bold m-1">
            {boardroom ? "Update Boardroom" : "ADD BOARDROOM"}
          </h4>
        </div>
      </div>
      <BoardroomForm boardroom={boardroom} />
    </div>
  );
};

export default AddBoardRoomForm;
