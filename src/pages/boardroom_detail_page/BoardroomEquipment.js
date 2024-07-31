import React from "react";
import samsung_img from "../../assets/sumsung.jpeg";
import { Link } from "react-router-dom";

const BoardroomEquipment = () => {
  return (
    <div id="boardroom-equipment" className="p-4">
      <div id="boardroom-equipment-filter" className=""></div>
      <div className="flex">
        <div
          id="equipment-card"
          className="bg-[#d9d9d9] bg-opacity-21 w-80 h-max"
        >
          <div id="card-image">
            <img src={samsung_img} alt="tv" className="w-full h-48" />
          </div>
          <div id="card-title" className="flex justify-center mt-2 uppercase">
            <h5 className="font-bold text-sm p-1">Samsung</h5>
          </div>
          <div
            id="card-description"
            className="flex justify-center items-center p-2  mb-2 text-opacity-90"
          >
            <p className="bg-white shadow-sm p-2 w-[100%] leading-5 font-[Roboto]">
              Samsung's 55" QN90B QLED TV combines vibrant colors with deep
              blacks, thanks to Quantum Dot and Neo QLED technology. It features
              a sleek design,
            </p>
          </div>
          <div id="card-video" className="flex">
            <div className="flex items-center">
              <Link className="text-[#06ABDD] m-3">
                Learn more about the item
              </Link>
              <span class="material-symbols-outlined">play_circle</span>
            </div>
          </div>
          <div id="disposal-section" className="m-3">
            <form>
              <label htmlFor="disponse" className="text-[#DD0606] mr-3 text-xs">
                Do you want to dispose this item?
              </label>
              <input type="checkbox" name="disposal" />
            </form>
          </div>
          <div
            id="card-footer"
            className="flex justify-between items-center p-2 mx-2 font-bold opacity-50"
          >
            <span className="text-sm">
              Model No:<i>WWWWXSCS CDC</i>
            </span>
            <h3 className="text-xs">Samsung</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardroomEquipment;
