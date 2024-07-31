import React from "react";
import { Oval } from "react-loader-spinner";

const AddBoardRoomForm = () => {
  return (
    <div id="add-boardroom" className="p-2 mb-52">
      <div className="w-max my-0 mx-auto">
        <form className="bg-gray-50 p-4 font-[Roboto] text-opacity-70 shadow flex gap-3 flex-col items-center sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="">
              <label className="block mb-1" htmlFor="name">
                Name
              </label>
              <div className="flex flex-col">
                <input
                  className="w-60 border border-solid outline-none p-1 pl-4 text-sm mb-1 shadow"
                  type="text"
                  name="name"
                  required
                />
                <span className="text-red-400 block tracking-wide text-sm italic">
                  required field
                </span>
              </div>
            </div>
            <div className="">
              <label className="block mb-1" htmlFor="centre">
                Centre
              </label>
              <div className="flex flex-col">
                <input
                  className="w-60 border border-solid outline-none p-1 pl-4 text-sm mb-1 shadow"
                  type="text"
                  name="centre"
                  required
                />
                <span className="text-red-400 block tracking-wide text-sm italic">
                  required field
                </span>
              </div>
            </div>
            <div className="">
              <label className="block mb-1" htmlFor="department">
                Department
              </label>
              <div className="flex flex-col">
                <input
                  className="w-60 border border-solid outline-none p-1 pl-4 text-sm mb-1 shadow"
                  type="text"
                  name="department"
                  required
                />
                <span className="text-red-400 block tracking-wide text-sm italic">
                  required field
                </span>
              </div>
            </div>
            <div className="">
              <label className="block mb-1" htmlFor="email">
                Email
              </label>
              <div className="flex flex-col">
                <input
                  className="w-60 border border-solid outline-none p-1 pl-4 text-sm mb-1 shadow"
                  type="email"
                  name="email"
                />
                <span className="text-red-400 block tracking-wide text-sm italic">
                  required field
                </span>
              </div>
            </div>
          </div>
          <div className="mx-10 flex items-center flex-col gap-4">
            <div className="">
              <label className="block mb-1" htmlFor="capacity">
                Capacity
              </label>
              <div className="flex flex-col">
                <input
                  className="w-60 border border-solid outline-none p-1 pl-4 text-sm mb-1 shadow"
                  type="number"
                  name="capacity"
                />
                <span className="text-red-400 block tracking-wide text-sm italic">
                  required field
                </span>
              </div>
            </div>
            <div className="">
              <label className="mb-1 mr-2" htmlFor="internet">
                Contains Internet?
              </label>
              <input
                className="shadow inline-block"
                type="checkbox"
                name="internet"
              />
            </div>
            <div className="">
              <label className="block mb-1" htmlFor="description">
                Brief description
              </label>
              <div className="flex flex-col w-80">
                <textarea
                  className="border border-solid outline-none p-1 pl-4 text-sm mb-1 shadow"
                  name="description"
                  required
                  rows="7"
                />
                <span className="text-red-400 block tracking-wide text-sm italic">
                  required field
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="mt-5">
              <label className="block mb-2" htmlFor="boardroom-mage">
                Choose a boardroom profile picture:
              </label>
              <div className="flex flex-col">
                <input
                  type="file"
                  id="boardroom-mage"
                  name="boardroom-mage"
                  accept="image/png, image/jpeg"
                />
                <span className="text-red-400 block tracking-wide text-sm italic">
                  required field
                </span>
              </div>
            </div>
            <input
              className="mt-10 bg-blue-300 w-48 p-2 font-bold text-white cursor-pointer shadow"
              type="submit"
              value="Create Boardroom"
            />
            <div className="flex items-end gap-2">
              <Oval
                visible={true}
                height="32"
                width="32"
                color="#FF956C"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
              <span className="text-xs italic text-[#DDC706] tracking-wider">
                creating item...
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBoardRoomForm;
