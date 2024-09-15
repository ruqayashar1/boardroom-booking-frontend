import React from "react";
import { ColorRing } from "react-loader-spinner";

const EquipmentImage = ({ imageUrl, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="h-[50vh] flex justify-center items-center bg-gray-200">
          <ColorRing
            visible={true}
            height="60"
            width="60"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="equipment"
          className="object-cover w-full h-full"
        />
      )}
    </>
  );
};

export default EquipmentImage;
