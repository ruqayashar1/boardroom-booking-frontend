
import React from "react";
import BoardroomFilterPopup from "./BoardroomFilterPopup";

const BoardRooms = () => {
  return (
    <section id="boardrooms" className="w-full relative">
      <BoardroomFilterPopup />
      <div id="all-boardrooms" className="p-4">
        <div id="boardroom-card">
          {/* Styled with Tailwind CSS */}
          <div className="flex items-start p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-x-4">
            <img
              className="w-32 h-32 object-cover square-full"
              src="https://img.freepik.com/premium-photo/corporate-office-rooms-concept-designs_853932-4112.jpg?size=626&ext=jpg"
              alt="Boardroom"
            />
            <div className="ml-4">
              <div className="text-xl font-medium text-black">CBRD Boardroom</div>
              <p className="text-gray-500">Capacity: 50</p>
              <p className="text-gray-500">Location:KEMRI Headquarters </p>
              <div className="mt-4 flex space-x-2">
                <button className="w-full px-4 py-0.5 bg-blue-500 text-white rounded-md hover:bg-blue-900">
                  WiFi Enabled
                </button>
                <button className="w-full px-4 py-0.5 bg-green-500 text-white rounded-md hover:bg-green-900">
                  Available
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardRooms;


