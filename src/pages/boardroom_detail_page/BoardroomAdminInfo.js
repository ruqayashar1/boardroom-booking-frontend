import React from "react";
import kemriLogo from "../../assets/kemri-logo.png";

const BoardroomAdminInfo = ({ boardroomAdmin }) => {
  return (
    <div className="max-w-sm bg-gradient-to-r from-blue-50 to-gray-100 shadow-lg overflow-hidden">
      <div className="flex items-center px-6 py-4">
        <img
          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-300"
          src={kemriLogo}
          alt="Profile"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {boardroomAdmin?.fullName}
          </h2>
          <p className="text-gray-600">{boardroomAdmin?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default BoardroomAdminInfo;
