import React from "react";

const BoardroomSettingItem = ({ item }) => {
  return (
    <div
      onClick={item.action}
      className="bg-[#d9d9d9] bg-opacity-[21%] m-1 my-2 flex items-center font-thin font-[Roboto] cursor-pointer rounded hover:bg-[#06ABDE] hover:text-white transition-all duration-300"
    >
      <span
        className={`material-symbols-outlined text-[#26ff26] mr-2 ml-4 py-2`}
      >
        {item.icon}
      </span>
      <h3 className="mr-4">{item.label}</h3>
    </div>
  );
};

export default BoardroomSettingItem;
