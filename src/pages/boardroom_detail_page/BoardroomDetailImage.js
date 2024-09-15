import React from "react";
import { ColorRing } from "react-loader-spinner";
import useBoardroomImage from "../../hooks/context/useBoardroomImage";

const BoardroomDetailImage = ({ boardroom }) => {
  const { imageUrl, isLoading } = useBoardroomImage(boardroom);
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
          alt="boardroom"
          className="w-[100%] h-[100%] opacity-80 rounded-sm shadow-lg brightness-90"
        />
      )}
    </>
  );
};

export default BoardroomDetailImage;
