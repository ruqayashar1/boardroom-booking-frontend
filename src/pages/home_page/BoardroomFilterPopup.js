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
      <div id="filter-search" className="flex justify-between p-2 mb-4">
        <div id="boardroom-search" className="flex shadow">
          <input
            type="search"
            className="h-8 border border-solid p-2 outline-none"
            placeholder="Search boardroom..."
          />
          <span className="material-symbols-outlined w-12 h-8 bg-[#ff956c] flex justify-center items-center cursor-pointer pl-0">
            search
          </span>
        </div>
        <div id="filter-reset" className="flex justify-center items-center">
          {isFilterApplied ? (
            <div
              onClick={removeFilters}
              id="reset-filter"
              className="w-8 h-8 shadow-lg rounded-full text-red-400 mr-2 flex items-center justify-center cursor-pointer"
            >
              <span title="reset filter" className="material-symbols-outlined ">
                history
              </span>
            </div>
          ) : null}
          <div
            onClick={toggleFiltetPopup}
            className="bg-[#C0F3FE] shadow-md flex items-center p-1 px-4 rounded-sm cursor-pointer"
          >
            <span className="material-symbols-outlined mr-2">filter_list</span>
            <h4 className="font-semibold opacity-60">Filters</h4>
          </div>
        </div>
      </div>
      <div
        ref={filterPanePopupRef}
        id="filter-popup"
        className="hidden absolute z-10 bg-white w-36 h-48 top-[50px] right-2 cursor-default shadow-lg hover:shadow"
      >
        <div
          id="boardroom-filter-header"
          className="w-[100%] bg-[#06ABDD] flex justify-between p-1 text-white"
        >
          <h4>Filters</h4>
          <span
            onClick={toggleFiltetPopup}
            title="close"
            className="material-symbols-outlined cursor-pointer hover:bg-slate-700 pr-0 opacity-80 transition-all duration-500 line-clamp-4"
          >
            close
          </span>
        </div>
        <div id="boardroom-filter-body">{/* write your code here */}</div>
      </div>
    </>
  );
};

export default BoardroomFilterPopup;
