import React, { useState } from "react";
import PreviousPageButton from "../ components/buttons/PreviousPageButton";
import Header from "../ components/header/Header";
import useTrackPreviousUrl from "../hooks/useTrackPreviousUrl";

const UserTimezonePage = () => {
  useTrackPreviousUrl();
  const [searchQuery, setSearchQuery] = useState("");
  const [yourTimezone, setYourTimezone] = useState("Africa/Nairobi");
  const [filteredTimezones, setFilteredTimezones] = useState([]);
  const timezones = [
    "Africa/Nairobi",
    "America/New_York",
    "Asia/Tokyo",
    "Europe/London",
    "Australia/Sydney",
    "Europe/Paris",
    "Asia/Dubai",
    "America/Los_Angeles",
    "Europe/Berlin",
    "Asia/Shanghai",
    "America/Chicago",
    "America/Sao_Paulo",
    "Asia/Kolkata",
    "Africa/Cairo",
    "America/Toronto",
    "Europe/Moscow",
    "Asia/Singapore",
    "Pacific/Auckland",
    "Europe/Zurich",
    "Africa/Johannesburg",
  ];
  const changeUserTimezone = (timezone) => {
    setYourTimezone(timezone);
    setSearchQuery("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    const zones = timezones.filter((timezone) =>
      timezone.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchQuery(searchValue);
    setFilteredTimezones(zones);
  };

  const filteredTimezonesByUserTimezone = timezones.filter((timezone) => {
    const filterTexts = yourTimezone.split("/");
    return (
      timezone.includes(filterTexts[0]) || timezone.includes(filterTexts[1])
    );
  });

  return (
    <>
      <Header />
      <div className="flex items-center">
        <PreviousPageButton />
        <div className="w-full h-8 bg-[#06ABDD] text-white font-bold px-2 font-[Roboto] shadow my-4 ml-10">
          <h4 className="font-bold m-1">USER TIMEZONE</h4>
        </div>
      </div>
      <div className="text-center mb-5">
        <div className="flex justify-center">
          <span className="inline-block w-max mr-2">
            Your current timezone:
          </span>
          <span className="font-bold">{yourTimezone}</span>
        </div>
      </div>
      <div className="w-3/4 mx-auto flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Do you wish to change timezone?"
          className="w-full p-2 border-2 border-gray-300 rounded shadow focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="shadow bg-gray-100 p-4 w-3/4 mx-auto flex flex-wrap gap-2">
        {searchQuery === ""
          ? filteredTimezonesByUserTimezone.map((timezone) => (
              <button
                onClick={() => changeUserTimezone(timezone)}
                key={timezone}
                className={
                  yourTimezone === timezone
                    ? "bg-red-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    : "bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                }
              >
                {timezone}
              </button>
            ))
          : filteredTimezones.map((timezone) => (
              <button
                onClick={() => changeUserTimezone(timezone)}
                key={timezone}
                className={
                  yourTimezone === timezone
                    ? "bg-red-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    : "bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                }
              >
                {timezone}
              </button>
            ))}
      </div>
    </>
  );
};

export default UserTimezonePage;
