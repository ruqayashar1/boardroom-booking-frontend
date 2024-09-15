import React from "react";
import { useNavigate } from "react-router-dom";

const PreviousPageButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <span className="w-[4rem] h-8 fixed z-10">
      <svg
        onClick={goBack}
        className="cursor-pointer hover:bg-gray-100"
        xmlns="http://www.w3.org/2000/svg"
        height="26px"
        viewBox="0 -960 960 960"
        width="26px"
        fill="#5f6368"
      >
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
    </span>
  );
};

export default PreviousPageButton;
