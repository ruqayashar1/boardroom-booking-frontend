import React from "react";
import { useNavigate } from "react-router-dom";
import LiveMeetingTableRow from "./LiveMeetingTableRow";

const LiveMeetingsTable = ({ liveMeetings }) => {
  const navigate = useNavigate();
  const navigateToReservationDetailPage = (tag) => {
    navigate(`/reservations/${tag}`);
  };
  return (
    <>
      <div className="w-[100%] shadow p-2 font-[Roboto] overflow-auto md:overflow-hidden scroll-smooth">
        <table className="w-full bg-white">
          <thead className="font-bold text-left border-b-2">
            <tr className="text-nowrap mb-24 bg-gray-100">
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Created By
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Start Date
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                End Date
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Start Time
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                End Time
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Boardroom
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-center">
                Continuing
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {liveMeetings.map((meeting, index) => (
              <LiveMeetingTableRow
                key={meeting.id}
                index={index}
                record={meeting}
                navigateToReservationDetailPage={
                  navigateToReservationDetailPage
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LiveMeetingsTable;
