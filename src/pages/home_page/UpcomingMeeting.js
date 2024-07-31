import React from "react";
import ReservationsTable from "../../ components/tables/ReservationsTable";

const UpcomingMeeting = () => {
  return (
    <div id="upcoming-meeting" className="p-2">
      <span className="block w-max uppercase mb-4 tracking-wide font-[Roboto] bg-gray-100 shadow-sm p-2">
        Upcoming Meetings
      </span>
      <ReservationsTable />
    </div>
  );
};

export default UpcomingMeeting;
