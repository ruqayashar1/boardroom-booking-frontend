import React, { useState } from "react";

const ErrorAlert = ({ removeError }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4"
      role="alert"
    >
      <span className="block sm:inline">
        Please choose another event date. The current one overlaps with another
        scheduled event.
      </span>
      <button
        onClick={() => removeError()}
        className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-700 hover:text-red-900"
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
