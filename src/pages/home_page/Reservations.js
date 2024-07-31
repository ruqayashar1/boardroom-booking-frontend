import React from "react";
import BoardroomReservations from "../boardroom_detail_page/BoardroomReservations";
import ReservationsTable from "../../ components/tables/ReservationsTable";

const Reservations = () => {
  return (
    <div id="reservations" className="p-2">
      <span className="block w-max uppercase mb-4 tracking-wide font-[Roboto] bg-gray-100 shadow-sm p-2">
        Reservations
      </span>
      <ReservationsTable />
    </div>
  );
};

export default Reservations;
