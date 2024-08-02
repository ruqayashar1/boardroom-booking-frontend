import React from "react";
import kemri_log from "../../assets/kemri-logo.png";

const Logo = () => {
  return (
    <div id="log" className="flex items-center ml-1 sm:ml-2">
      <img
        className="h-8 w-8 sm:h-10 sm:w-10"
        src={kemri_log}
        alt="kemri logo"
      />
      <h4 className="font-bold text-[#06ABDD] ml-2 text-sm sm:text-base font-[Inter]">
        BOARDROOM BOOKING
      </h4>
    </div>
  );
};

export default Logo;
