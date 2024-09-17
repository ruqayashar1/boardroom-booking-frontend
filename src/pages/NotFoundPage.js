import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="mb-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zM12 14c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm0 2c2.212 0 4 1.788 4 4s-1.788 4-4 4-4-1.788-4-4 1.788-4 4-4z"
          />
        </svg>
      </motion.div>

      <h1 className="text-3xl font-bold mb-4">Oops! Page Not Found</h1>
      <p className="mb-6">
        Sorry, we couldn’t find the page you were looking for.
      </p>

      <button
        onClick={handleGoHome}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
      >
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16l4-4m0 0l-4-4m4 4H3"
            />
          </svg>
          Go to Home
        </span>
      </button>
    </div>
  );
};

export default NotFoundPage;
