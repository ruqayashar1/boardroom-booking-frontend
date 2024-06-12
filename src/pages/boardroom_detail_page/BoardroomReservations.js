import React, { useState } from "react";
import ReservationDetails from "./ReservationDetails";

const BoardroomReservations = () => {
  const [isReservationDetailsPopupOpen, setIsReservationDetailsPopupOpen] =
    useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null); // by default should be null when no item is selected
  const showReservationDetailsPopup = (itemId) => {
    setSelectedItemId(itemId);
    setIsReservationDetailsPopupOpen(true);
  };
  const hideReservationDetailsPopup = () => {
    setIsReservationDetailsPopupOpen(false);
  };
  return (
    <>
      <div className="w-[100%] shadow p-2 font-[Roboto] overflow-auto md:overflow-hidden scroll-smooth">
        <table className="w-full bg-white">
          <thead className="font-bold text-left border-b-2">
            <tr className="text-nowrap mb-24 bg-gray-100">
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Booked BY
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
                Centre
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Department
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Approval Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr
              onClick={() => showReservationDetailsPopup(1)}
              className="bg-white cursor-pointer"
            >
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                John Maluki
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                6/6/2024
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                8 am
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                6/6/2024
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                11 am
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                HQ Nairobi
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Graduate School
              </td>
              <td className="text-[#06ABDD]">Approved</td>
            </tr>
            <tr
              onClick={() => showReservationDetailsPopup(2)}
              className="text-nowrap bg-gray-50 mt-10 cursor-pointer"
            >
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                John Maluki
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                6/6/2024
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                8 am
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                6/6/2024
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                11 am
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                HQ Nairobi
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Graduate School
              </td>
              <td className="text-[#DD0606]">Canceled</td>
            </tr>
            <tr
              onClick={() => showReservationDetailsPopup(3)}
              className="text-nowrap bg-white cursor-pointer"
            >
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                John Maluki
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                6/6/2024
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                8 am
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                6/6/2024
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                11 am
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                HQ Nairobi
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Graduate School
              </td>
              <td className="text-[#DDC706]">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
      {isReservationDetailsPopupOpen ? (
        <ReservationDetails
          selectedItemId={selectedItemId}
          hideReservationDetailsPopup={hideReservationDetailsPopup}
        />
      ) : null}
    </>
  );
};

export default BoardroomReservations;
