import React from "react";
import { useNavigate } from "react-router-dom";
import ReservationTableRow from "./ReservationTableRow";
import { storeCurrentSelectedReservationId } from "../../functions";

const ReservationsTable = ({
  reservations,
  filters,
  handleApprovalFilterFunc,
}) => {
  const navigate = useNavigate();
  const navigateToReservationDetailPage = (tag, reservationId) => {
    storeCurrentSelectedReservationId(reservationId);
    navigate(`/reservations/${tag}`);
  };
  return (
    <>
      <div className="w-full flex justify-end mb-5">
        <div className="flex items-center bg-gray-100 shadow p-2">
          <span className="block h-full p-1 bg-blue-200 shadow">Filters</span>
          <div className="flex gap-2">
            <div>
              <span className="m-2 text-[#06ABDD]">Approved</span>
              <input
                type="checkbox"
                name="approved"
                checked={filters?.approved}
                onChange={handleApprovalFilterFunc}
              />
            </div>
            <div>
              <span className="m-2 text-[#DDC706]">Pending</span>
              <input
                type="checkbox"
                name="pending"
                checked={filters?.pending}
                onChange={handleApprovalFilterFunc}
              />
            </div>
            <div>
              <span className="m-2 text-[#DD0606]">Canceled</span>
              <input
                type="checkbox"
                name="declined"
                checked={filters?.declined}
                onChange={handleApprovalFilterFunc}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] shadow p-2 font-[Roboto] overflow-auto md:overflow-hidden scroll-smooth">
        <table className="w-full bg-white">
          <thead className="font-bold text-left border-b-2">
            <tr className="text-nowrap mb-24 bg-gray-100">
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Booked By
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Start Date
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Start Time
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                End Date
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                End Time
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Boardroom
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Approval Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reservations.map((reservation, index) => (
              <ReservationTableRow
                key={reservation?.id}
                index={index}
                record={reservation}
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

export default ReservationsTable;
