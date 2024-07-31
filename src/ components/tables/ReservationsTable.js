import React from "react";

const ReservationsTable = () => {
  return (
    <>
      <div className="w-full flex justify-end mb-5">
        <div className="flex items-center bg-gray-100 shadow p-2">
          <span className="block border-r border-solid h-full p-1 bg-blue-200 shadow">
            Filters
          </span>
          <div className="flex gap-2">
            <div>
              <span className="m-2 text-[#06ABDD]">Approved</span>
              <input type="checkbox" checked />
            </div>
            <div>
              <span className="m-2 text-[#DDC706]">Pending</span>
              <input type="checkbox" checked />
            </div>
            <div>
              <span className="m-2 text-[#DD0606]">Canceled</span>
              <input type="checkbox" checked />
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
            <tr className="bg-white cursor-pointer hover:bg-red-50">
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
              <td className="text-[#06ABDD]">
                <span className="block bg-[#06ABDD] bg-opacity-10 p-1 px-4 rounded font-bold w-[7rem] text-center">
                  Approved
                </span>
              </td>
            </tr>
            <tr className="text-nowrap bg-gray-50 mt-10 cursor-pointer hover:bg-red-50">
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
              <td className="text-[#DD0606]">
                <span className="block bg-[#DD0606] bg-opacity-10 p-1 px-4 rounded font-bold w-[7rem] text-center">
                  Canceled
                </span>
              </td>
            </tr>
            <tr className="text-nowrap bg-white cursor-pointer hover:bg-red-50">
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
              <td className="text-[#DDC706]">
                <span className="block bg-[#DDC706] bg-opacity-10 p-1 px-4 rounded font-bold w-[7rem] text-center">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReservationsTable;
