import React from "react";
import { ColorRing } from "react-loader-spinner";

const BoardroomImage = ({ imageUrl, isLoading }) => {
  return (
    <div className="relative w-full">
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
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
      )}
      <img
        src={imageUrl}
        alt="boardroom"
        className="h-32 sm:h-48 w-full object-cover animate-fadeIn"
      />
    </div>
  );
};

export default BoardroomImage;
