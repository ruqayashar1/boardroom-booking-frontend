import React from "react";
import ReservationForm from "../../components/forms/ReservationForm";
import { removeSelectedCalendarDate } from "../../functions";

const MakeReservationForm = ({ toggleReservationForm, boardroom }) => {
  return (
    <aside
      id="make-reservation-popup"
      className="w-full shadow absolute bg-white top-0 right-0 z-50"
    >
      <div className="flex justify-start p-4 mb-6">
        <button
          onClick={() => {
            removeSelectedCalendarDate();
            toggleReservationForm();
          }}
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

      <div className="w-[75%] bg-white shadow mb-4 mx-auto font-[Nunito]">
        <div className="shadow p-4 flex justify-center font-bold">
          <span>{`MAKE RESERVATION - ${boardroom?.name}`}</span>
        </div>
        <ReservationForm boardroom={boardroom} updateFormType={false} />
      </div>
    </aside>
  );
};

export default MakeReservationForm;
