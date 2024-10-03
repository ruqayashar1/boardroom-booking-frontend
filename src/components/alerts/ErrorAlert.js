import React from "react";

const ErrorAlert = ({ removeError, message }) => {
  return (
    <div
      className=" flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-2 py-2 rounded relative m-2"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <button
        onClick={() => removeError()}
        className="px-2 text-red-700 hover:text-red-900"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default ErrorAlert;
