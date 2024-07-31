import React from "react";
import { Bars } from "react-loader-spinner";

const LiveMeetingsTable = () => {
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
                Centre
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Department
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LiveMeetingsTable;
