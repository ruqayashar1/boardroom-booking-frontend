import React, { useEffect, useState } from "react";
import PreviousPageButton from "../components/buttons/PreviousPageButton";
import Header from "../components/header/Header";
import useTrackPreviousUrl from "../hooks/useTrackPreviousUrl";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimezones } from "../context/timezone/timezoneSlice";

const UserTimezonePage = () => {
  useTrackPreviousUrl();
  const [searchQuery, setSearchQuery] = useState("");
  const [yourTimezone, setYourTimezone] = useState("Africa/Nairobi");
  const [filteredTimezones, setFilteredTimezones] = useState([]);
  const timezones = useSelector((state) => state.timezone.timezones);
  // const error = useSelector((state) => state.timezone.error);
  const dispatch = useDispatch();

  // console.log(error);
  console.log(timezones);

  const changeUserTimezone = (timezone) => {
    setYourTimezone(timezone);
    setSearchQuery("");
  };

  const fetchTimezonesFromServer = () => {
    dispatch(fetchTimezones());
  };

  useEffect(() => {
    fetchTimezonesFromServer();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    const zones = timezones.filter((timezone) =>
      timezone?.timezone.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchQuery(searchValue);
    setFilteredTimezones(zones);
  };

  const filteredTimezonesByUserTimezone = timezones.filter((timezone) => {
    const filterTexts = yourTimezone.split("/");
    return (
      timezone.timezone.toLowerCase().includes(filterTexts[0].toLowerCase()) ||
      timezone.timezone.toLowerCase().includes(filterTexts[1].toLowerCase())
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
                onClick={() => changeUserTimezone(timezone.timezone)}
                key={timezone.timezone}
                className={
                  yourTimezone === timezone.timezone
                    ? "bg-red-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    : "bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                }
              >
                {timezone.timezone}
              </button>
            ))
          : filteredTimezones.map((timezone) => (
              <button
                onClick={() => changeUserTimezone(timezone.timezone)}
                key={timezone.timezone}
                className={
                  yourTimezone === timezone.timezone
                    ? "bg-red-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    : "bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                }
              >
                {timezone.timezone}
              </button>
            ))}
      </div>
    </>
  );
};

export default UserTimezonePage;
