import React from "react";
import samsung_img from "../../assets/sumsung.jpeg";
import { Link } from "react-router-dom";
import EquipmentImage from "./EquipmentImage";

const BoardroomEquipmentCard = ({ equipment }) => {
  return (
    <div
      id="equipment-card"
      className="bg-[#d6d5d53d] bg-opacity-21 w-80 h-max rounded-lg shadow-lg overflow-hidden"
    >
      <div
        id="card-image"
        className="w-full h-56 bg-gray-200 flex justify-center items-center overflow-hidden"
      >
        <EquipmentImage
          base64String={equipment?.picture}
          equipmentTitle={equipment?.title}
        />
      </div>
      <div id="card-title" className="flex justify-center mt-2 uppercase">
        <h5 className="font-bold text-sm p-1 text-[#024458]">
          {equipment?.title}
        </h5>
      </div>
      <div
        id="card-description"
        className="flex justify-center items-center p-2 mb-2 text-opacity-90"
      >
        <p className="bg-white shadow-sm p-2 w-[90%] leading-5 font-[Roboto] text-sm">
          {equipment?.description}
        </p>
      </div>
      <div id="card-video" className="flex justify-center items-center p-2">
        <Link
          to={equipment?.videoUrl}
          target="_blank"
          className="text-[#06ABDD] m-3 text-sm flex items-center"
        >
          Learn more
          <span className="material-symbols-outlined ml-1">play_circle</span>
        </Link>
      </div>
      <div id="disposal-section" className="m-3">
        <form className="flex items-center">
          <label htmlFor="disposal" className="text-[#DD0606] mr-2 text-sm">
            Dispose this item?
          </label>
          <input
            type="checkbox"
            name="disposal"
            className="w-4 h-4 rounded border-gray-300 text-[#DD0606] focus:ring-[#DD0606]"
          />
        </form>
      </div>
      <div
        id="card-footer"
        className="flex justify-between items-center p-2 mx-2 font-bold text-gray-600 text-xs"
      >
        <span>
          Model No: <i>{equipment?.modelNumber}</i>
        </span>
        <h3 className="text-xs">{equipment?.brand}</h3>
      </div>
    </div>
  );
};

export default BoardroomEquipmentCard;
