import React, { useState } from "react";
import _ from "lodash";
import { checkEmailValidity } from "../../functions";

const AttendeeSearch = ({
  kemriEmployees,
  attendees,
  chooseAttendees,
  removeAttendee,
}) => {
  const [query, setQuery] = useState("");
  const [filteredAttendees, setFilteredAttendees] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    if (searchValue.length > 0) {
      const filtered = _.unionBy(kemriEmployees, "email").filter(
        (kemriEmployee) =>
          kemriEmployee.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredAttendees(filtered);
    } else {
      setFilteredAttendees([]);
    }
  };

  const handleSelectAttendee = (attendee) => {
    chooseAttendees(attendee);
    setQuery("");
    setFilteredAttendees([]);
  };

  const handleRemoveAttendee = (attendee) => {
    removeAttendee(attendee);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <span className="w-full sm:w-1/4 inline-block text-center sm:text-left">
          Select Attendees
        </span>
        <div className="w-full sm:w-3/4 relative">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for attendees"
            className="w-full p-2 border-2 border-gray-300 rounded shadow focus:outline-none focus:border-blue-500"
          />
          {query &&
            filteredAttendees.length === 0 &&
            checkEmailValidity(query) && (
              <button
                onClick={() => handleSelectAttendee({ email: query })}
                className="my-2 p-2 bg-green-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-green-600 active:shadow-none transform active:translate-y-1 transition-transform flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#fff"
                >
                  <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
                </svg>
                <span>Add</span>
              </button>
            )}
          {query && filteredAttendees.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
              {filteredAttendees.map((attendee) => (
                <li
                  key={attendee.email}
                  onClick={() => handleSelectAttendee(attendee)}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                >
                  {attendee.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start my-5 space-x-2">
        {_.uniqBy(attendees, "email").map((attendee) => (
          <button
            type="button"
            key={attendee.email}
            onClick={() => handleRemoveAttendee(attendee)}
            className="flex items-center space-x-2 bg-[#06ABDD] text-white px-3 py-1 rounded-full shadow hover:bg-blue-400 transition mt-2 sm:mt-0"
          >
            <span>{attendee.email}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AttendeeSearch;
