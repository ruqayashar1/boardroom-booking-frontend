import React, { useRef, useState } from "react";

const BoardroomFilterPopup = () => {
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const filterPanePopupRef = useRef();

  const removeFilters = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFilterApplied(false);
  };

  const toggleFiltetPopup = () => {
    filterPanePopupRef.current.classList.toggle("hidden");
  };
  return (
    <>
      <div
        id="filter-search"
        className="flex flex-wrap justify-between p-2 mb-4 gap-4 lg:gap-0"
      >
        <div id="boardroom-search" className="flex shadow w-full lg:w-auto">
          <input
            type="search"
            className="h-10 w-full lg:w-auto border border-solid p-2 outline-none"
            placeholder="Search boardroom..."
          />
          <span className="material-symbols-outlined w-12 h-10 bg-[#ff956c] flex justify-center items-center cursor-pointer">
            search
          </span>
        </div>
        <div
          id="filter-reset"
          className="flex items-center justify-end gap-4 w-full lg:w-auto"
        >
          {isFilterApplied && (
            <div
              onClick={removeFilters}
              id="reset-filter"
              className="w-10 h-10 shadow-lg rounded-full text-red-400 flex items-center justify-center cursor-pointer"
            >
              <span title="reset filter" className="material-symbols-outlined">
                history
              </span>
            </div>
          )}
          <div
            onClick={toggleFiltetPopup}
            className="bg-[#C0F3FE] shadow-md flex items-center p-2 px-4 rounded-sm cursor-pointer"
          >
            <span className="material-symbols-outlined mr-2">filter_list</span>
            <h4 className="font-semibold opacity-60">Filters</h4>
          </div>
        </div>
      </div>
      <div
        ref={filterPanePopupRef}
        id="filter-popup"
        className="hidden absolute z-10 bg-white w-36 h-max top-[50px] right-2 cursor-default shadow-lg hover:shadow"
      >
        <div
          id="boardroom-filter-header"
          className="w-full bg-[#06ABDD] flex justify-between p-1 text-white"
        >
          <h4>Filters</h4>
          <span
            onClick={toggleFiltetPopup}
            title="close"
            className="material-symbols-outlined cursor-pointer hover:bg-slate-700 opacity-80 transition-all duration-500"
          >
            close
          </span>
        </div>
        <div id="boardroom-filter-body" className="h-max py-2 font-[Nunito]">
          <div className="p-2">
            <span className="block text-sm mb-1">Capacity</span>
            <input
              className="estimated-capacity w-full p-2 border rounded shadow text-sm outline-none"
              type="number"
              name="estimated-capacity"
              min={2}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardroomFilterPopup;
