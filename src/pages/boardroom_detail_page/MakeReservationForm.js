import React from "react";
import ReservationForm from "../../ components/forms/ReservationForm";

const MakeReservationForm = ({ toggleReservationForm, boardroom }) => {
  return (
    <aside
      id="make-reservation-popup"
      className="w-full shadow shadow-slate-500 absolute bg-white top-16 left-0 z-10"
    >
      <div className="w-full bg-gray-50 absolute top-0 my-4 bg-opacity-95">
        <div className="w-[75%] bg-white shadow mb-4 mx-auto font-[Nunito]">
          <div className="text-white shadow p-4 flex justify-between bg-gradient-to-tr from-[#06ABDE] to-[#8fdef8] bg-opacity-50">
            <span>{`MAKE RESERVATION - ${boardroom}`}</span>
            <svg
              onClick={toggleReservationForm}
              className="cursor-pointer hover:bg-slate-700 opacity-80 transition-all duration-500"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>
          <ReservationForm boardroom={boardroom} updateFormType={false} />
        </div>
      </div>
    </aside>
  );
};

export default MakeReservationForm;
