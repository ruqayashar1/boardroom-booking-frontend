import React from "react";
import BoardroomContactForm from "./BoardroomContactForm";

const CreateBoardroomContact = ({ toggleBoardroomContact, boardroom }) => {
  return (
    <div className="bg-white w-full absolute top-[0px] right-0 z-20 h-[100%] shadow">
      <div className="flex justify-start p-4">
        <button
          onClick={toggleBoardroomContact}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600 transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Cancel
        </button>
      </div>
      <BoardroomContactForm boardroom={boardroom} />
    </div>
  );
};

export default CreateBoardroomContact;
