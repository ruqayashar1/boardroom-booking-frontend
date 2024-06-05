
// import React from "react";
// import BoardroomFilterPopup from "./BoardroomFilterPopup";

// const BoardRooms = () => {
//   return (
//     <section id="boardrooms" className="w-full relative">
//       <BoardroomFilterPopup />
//       <div id="all-boardrooms" className="p-4 flex space-x-4">
//         <div id="boardroom-card">
//           {/* Styled with Tailwind CSS */}
//           <div className="flex items-start p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-x-4">
//             <img
//               className="w-32 h-32 object-cover square-full"
//               src="https://img.freepik.com/premium-photo/corporate-office-rooms-concept-designs_853932-4112.jpg?size=626&ext=jpg"
//               alt="Boardroom"
//             />
//             <div className="ml-4">
//               <div className="text-xl font-medium text-black">CBRD Boardroom</div>
//               <p className="text-gray-500">Capacity: 50</p>
//               <p className="text-gray-500">Location:KEMRI Headquarters </p>
//               <div className="mt-4 flex space-x-2">
//                 <button className="w-full px-4 py-0.5 bg-blue-500 text-white rounded-md hover:bg-blue-900">
//                   WiFi Enabled
//                 </button>
//                 <button className="w-full px-4 py-0.5 bg-green-500 text-white rounded-md hover:bg-green-900">
//                   Available
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div id="boardroom-card-2" className="flex items-start p-6 max-w-sm bg-white rounded-xl shadow-md space-x-4">
//           <img
//             className="w-32 h-32 object-cover rounded-full"
//             src="https://via.placeholder.com/150"
//             alt="Boardroom"
//           />
//           <div className="ml-4">
//             <div className="text-xl font-medium text-black"> Training Centre Boardroom</div>
//             <p className="text-gray-500">Capacity: 120</p>
//             <p className="text-gray-500">Location: Training Centre Brief Description</p>
//             <p className="text-gray-500">Suitable for physical, virtual and hybrid meetings</p>
//             <div className="mt-4 flex space-x-2">
//               <button className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700">
//                 WiFi Enabled
//               </button>
//               <button className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-700">
//                 Available
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       </div>
      
//     </section>
//   );
// };

// export default BoardRooms;


import React from "react";
import BoardroomFilterPopup from "./BoardroomFilterPopup"; // Ensure the correct path

const BoardRooms = () => {
  return (
    <section id="boardrooms" className="w-full relative">
      <BoardroomFilterPopup />
      <div id="all-boardrooms" className="p-4 flex space-x-14">
        <div id="boardroom-card-1" className="flex items-start p-6 max-w-sm bg-white rounded-xl shadow-md space-x-4">
          <img
            className="w-32 h-36 object-cover square-full"
            src="https://img.freepik.com/premium-photo/corporate-office-rooms-concept-designs_853932-4112.jpg?size=626&ext=jpg"
            alt="Boardroom"
          />
          <div className="ml-4">
            <div className="text-xl font-medium text-black"> CBRD Boardroom</div>
            <p className="text-gray-500">Capacity: 50</p>
            <p className="text-gray-500">Location: KEMRI Headquarters</p>
            <div className="mt-4 flex space-x-2">
              <button className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                WiFi Enabled
              </button>
              <button className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-700">
                Available
              </button>
            </div>
          </div>
        </div>
        <div id="boardroom-card-2" className="flex items-start p-6 max-w-sm bg-white rounded-xl shadow-md space-x-4">
          <img
            className="w-32 h-38 object-cover square-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC3cqw4RicBWO4NpnJaPsd9zrrO8XpvId6FhPK2zoklBz4LATFpbzIDV8Lfo-Wj-z2LBo&usqp=CAU"
            alt="Boardroom"
          />
          <div className="ml-4">
            <div className="text-xl font-medium text-black">MAIN Boardroom</div>
            <p className="text-gray-500">Capacity: 150</p>
            <p className="text-gray-500">Location: KEMRI HQ </p>
            {/* <p className="text-gray-500">Suitable  for physical, virtual and Hybrid seminars</p> */}
            <div className="mt-4 flex space-x-2">
              <button className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                WiFi Enabled
              </button>
              <button className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-700">
                Available
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="all-boardrooms" className="p-4 flex space-x-14">
        <div id="boardroom-card-1" className="flex items-start p-6 max-w-sm bg-white rounded-xl shadow-md space-x-4">
          <img
            className="w-32 h-34 object-cover square-full"
            src="https://img.freepik.com/premium-photo/corporate-office-rooms-concept-designs_853932-4112.jpg?size=626&ext=jpg"
            alt="Boardroom"
          />
          <div className="ml-4">
            <div className="text-xl font-medium text-black">ESACIPAC Boardroom</div>
            <p className="text-gray-500">Capacity: 80</p>
            <p className="text-gray-500">Location: Training Centre</p>
            <div className="mt-4 flex space-x-2">
              <button className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                WiFi Enabled
              </button>
              <button className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-700">
                Available
              </button>
            </div>
          </div>
        </div>
        <div id="boardroom-card-2" className="flex items-start p-6 max-w-sm bg-white rounded-xl shadow-md space-x-4">
          <img
            className="w-32 h-38 object-cover square-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC3cqw4RicBWO4NpnJaPsd9zrrO8XpvId6FhPK2zoklBz4LATFpbzIDV8Lfo-Wj-z2LBo&usqp=CAU"
            alt="Boardroom"
          />
          <div className="ml-4">
            <div className="text-xl font-medium text-black">  CVR Boardroom</div>
            <p className="text-gray-500">Capacity: 150</p>
            <p className="text-gray-500">Location: KEMRI HQ </p>
            {/* <p className="text-gray-500">Suitable  for physical, virtual and Hybrid seminars</p> */}
            <div className="mt-4 flex space-x-2">
              <button className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                WiFi Enabled
              </button>
              <button className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-700">
                Available
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardRooms;
