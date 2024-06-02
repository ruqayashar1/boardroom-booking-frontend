import React from "react";
import kemri_log from "../../assets/kemri-logo.png";

const Header = () => {
  return (
    <header
      id="header"
      className="flex justify-between items-center h-[70px] p-2 shadow-sm"
    >
      <div id="log" className="flex items-center">
        <img className="h-10 w-10" src={kemri_log} alt="kemri log" />
        <h4 className="font-bold text-[#06ABDD] ml-2 font-[Inter]">
          BOARDROOM BOOKING
        </h4>
      </div>
      <div
        id="right-area"
        className="flex justify-between items-center md:w-[400px] gap-1"
      >
        <div
          id="notication-area"
          className="flex items-center justify-center relative h-10 w-10 bg-[#E4E6EB]  opacity-70 rounded-full cursor-pointer hover:opacity-100"
        >
          <span class="material-symbols-outlined">notifications</span>
          <div className="w-5 h-5 rounded-full bg-[#E41E3F] flex items-center justify-center absolute -top-2 -right-1">
            <h4 className="text-center text-white font">4</h4>
          </div>
        </div>
        <h3 className="font-bold cursor-pointer text-[#06ABDD] p-1 rounded-sm transition duration-1000 ease-out hover:bg-[#f3f3f3]">
          BOARDROOMS
        </h3>
        <div
          id="user-profile"
          className="flex font-[Inter] cursor-pointer opacity-70 hover:opacity-100"
        >
          <span class="material-symbols-outlined">person</span>
          <h3 className="font-bold opacity-80">Rukia</h3>
          <span class="material-symbols-outlined">arrow_drop_down</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
