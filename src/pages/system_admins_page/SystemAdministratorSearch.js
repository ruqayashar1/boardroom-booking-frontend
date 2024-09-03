import React, { useCallback, useEffect, useState } from "react";
import { checkEmailValidity } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  createSystemAdmin,
  fetchCurrentAdmins,
  removeSystemAdmin,
} from "../../context/users/systemAdminsSLice";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";

const SystemAdministratorSearch = ({ kemriEmployees }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const selectedAdmins = useSelector(
    (state) => state.systemAdmin.currentAdmins
  );

  const isLoading = useSelector((state) => state.systemAdmin.isLoading);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    if (searchValue.length > 0) {
      const filtered = _.uniqBy(kemriEmployees, "email").filter((admin) =>
        admin.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredAdmins(filtered);
    } else {
      setFilteredAdmins([]);
    }
  };

  const handleSelectAdmin = (val) => {
    dispatch(createSystemAdmin(val));
    setQuery("");
    setFilteredAdmins([]);
  };

  const handleRemoveAdmin = (val) => {
    dispatch(removeSystemAdmin(val?.id));
  };

  const fetchSystemsAdminsFromServer = useCallback(() => {
    dispatch(fetchCurrentAdmins());
  }, [dispatch]);

  useEffect(() => {
    fetchSystemsAdminsFromServer();
  }, [fetchSystemsAdminsFromServer]);

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
            className="w-full p-3 border-2 border-gray-300 rounded shadow focus:outline-none focus:border-blue-500"
          />
          {query &&
            filteredAdmins.length === 0 &&
            checkEmailValidity(query) && (
              <button
                onClick={() => handleSelectAdmin({ email: query })}
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

      {isLoading ? (
        <LoaderIndicator />
      ) : (
        <div className="flex flex-wrap justify-center sm:justify-start my-5 space-x-2">
          {selectedAdmins.map((admin) => (
            <div class="relative group">
              <button
                type="button"
                key={admin.email}
                onDoubleClick={() => handleRemoveAdmin(admin)}
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

              <div class="absolute bottom-full mb-2 hidden group-hover:block w-max bg-red-800 text-white text-sm rounded py-1 px-3">
                Double click removes the item!
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SystemAdministratorSearch;
