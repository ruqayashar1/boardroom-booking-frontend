import React, { useState } from "react";

const SystemAdministratorSearch = ({ systemAdmins }) => {
  const [query, setQuery] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    if (searchValue.length > 0) {
      const filtered = systemAdmins.filter((admin) =>
        admin.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredAdmins(filtered);
    } else {
      setFilteredAdmins([]);
    }
  };

  const handleSelectAdmin = (attendee) => {
    setSelectedAdmins((prev) => [...prev, attendee]);
    setQuery("");
    setFilteredAdmins([]);
  };

  const handleRemoveAdmin = (attendee) => {
    setSelectedAdmins((prev) => prev.filter((a) => a.email !== attendee.email));
  };

  return (
    <div className="w-full font-Inter] text-sm">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <span className="font-bold uppercase w-full text-nowrap mr-3 sm:w-1/4 inline-block text-center sm:text-left">
          Select Administrators
        </span>
        <div className="w-full sm:w-3/4 relative">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for users"
            className="w-full p-2 border-2 border-gray-300 rounded shadow focus:outline-none focus:border-blue-500"
          />
          {query && filteredAdmins.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
              {filteredAdmins.map((admin) => (
                <li
                  key={admin.email}
                  onClick={() => handleSelectAdmin(admin)}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                >
                  {admin.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start my-5 space-x-2">
        {selectedAdmins.map((admin) => (
          <button
            type="button"
            key={admin.email}
            onClick={() => handleRemoveAdmin(admin)}
            className="flex items-center space-x-2 bg-[#06ABDD] text-white px-3 py-1 rounded-full shadow hover:bg-blue-400 transition mt-2 sm:mt-0"
          >
            <span>{admin.email}</span>
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

export default SystemAdministratorSearch;
