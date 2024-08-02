import React from "react";

const ConfirmVenueChangeAlert = ({ onClose, confirmAcceptedFunc }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Confirm Venue Change</h2>
        <p className="mb-6">Are you sure you want to change venue?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => {
              onClose();
              confirmAcceptedFunc(false);
            }}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              confirmAcceptedFunc(true);
            }}
            className="bg-[#52AC43] text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Confirm Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmVenueChangeAlert;
