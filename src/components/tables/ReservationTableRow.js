import React from "react";
import {
  formatDateToHumanReadableForm,
  formatTimeToHumanReadableForm,
} from "../../functions";

const ReservationTableRow = ({
  index,
  record,
  navigateToReservationDetailPage,
}) => {
  return (
    <tr
      onClick={() => navigateToReservationDetailPage(record?.tag)}
      className={
        (index + 1) % 2 === 0
          ? "text-nowrap bg-gray-50 mt-10 cursor-pointer hover:bg-red-50"
          : "bg-white cursor-pointer hover:bg-red-50"
      }
    >
      <td className="p-3 text-sm uppercase text-gray-700 whitespace-nowrap">
        {record?.reservedBy}
      </td>
      <td className="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
        {formatDateToHumanReadableForm(record?.startDate)}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {formatTimeToHumanReadableForm(record?.startDate, record?.startTime)}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {formatDateToHumanReadableForm(record?.endDate)}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {formatTimeToHumanReadableForm(record?.endDate, record?.endTime)}
      </td>
      <td className="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
        {record?.boardroomName}
      </td>
      {record?.approvalStatus === "PENDING" ? (
        <td className="text-[#DDC706]">
          <span className="block bg-[#DDC706] bg-opacity-10 p-1 px-4 rounded font-bold w-[7rem] text-center">
            PENDING
          </span>
        </td>
      ) : record?.approvalStatus === "APPROVED" ? (
        <td className="text-[#06ABDD]">
          <span className="block bg-[#06ABDD] bg-opacity-10 p-1 px-4 rounded font-bold w-[7rem] text-center">
            {record?.approvalStatus}
          </span>
        </td>
      ) : (
        <td className="text-[#DD0606]">
          <span className="block bg-[#DD0606] bg-opacity-10 p-1 px-4 rounded font-bold w-[7rem] text-center">
            DECLINED
          </span>
        </td>
      )}
    </tr>
  );
};

export default ReservationTableRow;
