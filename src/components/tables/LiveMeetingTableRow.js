import React from "react";
import {
  formatDateToHumanReadableForm,
  formatTimeToHumanReadableForm,
} from "../../functions";
import { Bars } from "react-loader-spinner";

const LiveMeetingTableRow = ({
  index,
  record,
  navigateToReservationDetailPage,
}) => {
  return (
    <tr
      onClick={() => navigateToReservationDetailPage(1)}
      className={
        (index + 1) % 2 !== 0
          ? "bg-white cursor-pointer hover:bg-red-50"
          : "text-nowrap bg-gray-50 mt-10 cursor-pointer hover:bg-red-50"
      }
    >
      <td className="p-3 text-sm font-bold text-gray-700 whitespace-nowrap">
        {record?.reservedBy}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
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
      <td className="p-3 text-sm font-bold text-gray-700 whitespace-nowrap">
        {record?.boardroomName}
      </td>
      <td className="text-[#06ABDD] flex justify-center">
        <div className="">
          <Bars
            height="20"
            width="20"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </td>
    </tr>
  );
};

export default LiveMeetingTableRow;
