import React from "react";

const AdminCreateForm = ({ toggleAdminForm }) => {
  return (
    <div className="bg-red-200 w-full absolute top-20 right-0 z-10 h-screen">
      <aside
        id="add-admin-popup"
        className="w-[60%] h-max shadow shadow-slate-500  bg-white mx-auto"
      >
        <div className="w-full h-8 bg-[#06ABDD] text-white font-bold flex justify-between items-center px-2">
          <h3>ADMIN FORM</h3>
          <span
            onClick={toggleAdminForm}
            title="close"
            className="material-symbols-outlined cursor-pointer hover:bg-slate-700 pr-0 opacity-80 transition-all duration-500 line-clamp-4"
          >
            close
          </span>
        </div>
        {/* write your code here */}
        <div className="flex p-2 gap-4">
          <div className="">
            <div className="flex mr-2 items-center">
              <svg
                className="mr-2"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
              </svg>
              <input
                className="h-8 p-2 border solid outline-none"
                type="text"
                name="email"
                placeholder="user email"
              />
            </div>
            <button className="bg-blue-200 p-2 w-full"></button>
          </div>
          <div className="bg-gray-100 shadow-lg w-full p-2">
            <div className="w-max flex items-center bg-blue-200 hover:bg-blue-300 py-2 px-4 rounded-full">
              <button className="mr-3">john@kemri.go.ke</button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#5f6368"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AdminCreateForm;
