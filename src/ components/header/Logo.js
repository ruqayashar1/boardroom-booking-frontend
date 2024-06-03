import React from "react";
import kemri_log from "../../assets/kemri-logo.png";

const Logo = () => {
  return (
    <div id="log" className="flex items-center">
      <img className="h-10 w-10" src={kemri_log} alt="kemri log" />
      <h4 className="font-bold text-[#06ABDD] ml-2 font-[Inter]">
        BOARDROOM BOOKING
      </h4>
    </div>
  );
};

export default Logo;
