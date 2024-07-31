import React from "react";
import LiveMeetingsTable from "../../ components/tables/LiveMeetingsTable";

const LiveMeetings = () => {
  return (
    <div id="live-meetings" className="p-2">
      <span className="block w-max uppercase mb-4 tracking-wide font-[Roboto] bg-gray-100 shadow-sm p-2">
        Live Meetings
      </span>
      <LiveMeetingsTable />
    </div>
  );
};

export default LiveMeetings;
