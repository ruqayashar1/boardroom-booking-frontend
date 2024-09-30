import React, { useState } from "react";

const CopyToClipboard = ({ textToBeCopied }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToBeCopied).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };
  return (
    <div className="flex items-center justify-center">
      <span
        onClick={handleCopy}
        className="font-[Roboto] shadow-lg hover:text-blue-600 cursor-copy inline-block bg-gray-200 px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {copied ? "Copied!" : "Click to Copy"}
      </span>
    </div>
  );
};

export default CopyToClipboard;
