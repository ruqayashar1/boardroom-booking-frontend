import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const errorMiddleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMessage = action.payload?.message || action.payload;
    // Optionally show a toast notification
    toast.error(`Error: ${errorMessage}`);
  }

  return next(action);
};

export default errorMiddleware;
