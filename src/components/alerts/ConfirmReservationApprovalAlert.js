import React, { useState } from "react";
import * as Yup from "yup";
import DeclinationMessage from "../forms/DeclinationMessage";

const validationSchema = Yup.object({
  cancellationMessage: Yup.string()
    .required("Declination message is required")
    .max(300, "Must be 300 characters or less"),
});

const ConfirmReservationApprovalAlert = ({
  onClose,
  isAcceptButton,
  handleApproval,
}) => {
  const [cancellationMessage, setCancellationMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setCancellationMessage(event.target.value);
    setError(""); // Clear error on input change
  };

  const handleValidateAndSubmit = () => {
    validationSchema
      .validate({ cancellationMessage })
      .then((values) => {
        setError("");
        const { cancellationMessage } = values;
        handleApproval("DECLINED", cancellationMessage);
        onClose();
      })
      .catch((validationError) => {
        setError(validationError.message);
      });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Confirm Reservation</h2>
        <p className="mb-6">{`Are you sure you want to ${
          isAcceptButton ? "accept" : "decline"
        } this request?`}</p>
        {!isAcceptButton && (
          <DeclinationMessage
            value={cancellationMessage}
            onChange={handleChange}
            error={error}
          />
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          {isAcceptButton ? (
            <button
              onClick={() => {
                handleApproval("APPROVED");
                onClose();
              }}
              className="bg-[#52AC43] text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Accept
            </button>
          ) : (
            <button
              onClick={handleValidateAndSubmit}
              className="bg-[#D4342C] text-white px-4 py-2 rounded-md hover:bg-red-800"
            >
              Decline
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmReservationApprovalAlert;
