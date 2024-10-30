import React from "react";

const DeclinationMessage = ({ value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="cancellationMessage"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Declination Message
      </label>
      <textarea
        id="cancellationMessage"
        name="cancellationMessage"
        value={value}
        onChange={onChange}
        className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-3 w-full text-gray-800 placeholder-gray-400 resize-none shadow-sm"
        placeholder="Enter the reason for declination"
        rows="4" // Adjust the rows attribute as needed
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default DeclinationMessage;
