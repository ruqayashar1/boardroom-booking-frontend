import React, { useState } from "react";

const AttendeeSearch = ({ attendees }) => {
  const [query, setQuery] = useState("");
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const [selectedAttendees, setSelectedAttendees] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    if (searchValue.length > 0) {
      const filtered = attendees.filter((attendee) =>
        attendee.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredAttendees(filtered);
    } else {
      setFilteredAttendees([]);
    }
  };

  const handleSelectAttendee = (attendee) => {
    setSelectedAttendees((prev) => [...prev, attendee]);
    setQuery("");
    setFilteredAttendees([]);
  };

  const handleRemoveAttendee = (attendee) => {
    setSelectedAttendees((prev) =>
      prev.filter((a) => a.email !== attendee.email)
    );
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
        {selectedAttendees.map((attendee) => (
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
