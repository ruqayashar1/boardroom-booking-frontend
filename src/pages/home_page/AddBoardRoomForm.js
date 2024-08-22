import React from "react";
import BoardroomForm from "./BoardroomForm";
import PreviousPageButton from "../../components/buttons/PreviousPageButton";

const AddBoardRoomForm = () => {
  return (
    <div id="add-boardroom" className="mb-52">
      <div className="flex items-center">
        <PreviousPageButton />
        <div className="w-full h-8 bg-[#06ABDD] text-white font-bold px-2 font-[Roboto] shadow mb-4 ml-10">
          <h4 className="font-bold m-1">ADD BOARDROOM</h4>
        </div>
      </div>
      <BoardroomForm />
    </div>
  );
};

export default AddBoardRoomForm;
