import React from "react";
import { motion } from "framer-motion";

const EmptyBoxMessager = ({ displayText }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[40vh]">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        stroke="currentColor"
        className="w-24 h-24 text-gray-400"
        initial={{ y: 0 }}
        animate={{ y: [-5, 5, -5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <path
          d="M32 2l24 16v24l-24 16L8 42V18L32 2z"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M8 18l24 16 24-16"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 42l24-16 24 16"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
      <p className="mt-4 text-gray-500 text-lg">{displayText}</p>
    </div>
  );
};

export default EmptyBoxMessager;
