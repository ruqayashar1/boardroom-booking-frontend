import React, { useState, useRef, useEffect } from "react";

const BoardroomDescription = ({ description }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [truncatedText, setTruncatedText] = useState(description);
  const textRef = useRef(null);

  // Check if the text is overflowing the container height
  useEffect(() => {
    const element = textRef.current;
    if (element.scrollHeight > element.clientHeight) {
      setIsOverflowing(true);
      truncateText(); // Truncate text if it overflows
    }
  }, [description]);

  // Function to truncate text and add "..." if it overflows
  const truncateText = () => {
    const maxChars = 247; // Adjust the number of characters
    if (description.length > maxChars) {
      setTruncatedText(description.slice(0, maxChars) + "...");
    }
  };

  // Open Modal
  const handleReadMore = () => {
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="bg-gray-50 p-2 font-[Roboto] h-36 overflow-hidden"
        ref={textRef}
      >
        <p>{isOverflowing ? truncatedText : description}</p>
        {isOverflowing && (
          <button
            onClick={handleReadMore}
            className="text-blue-500 underline mt-2"
          >
            Read More
          </button>
        )}
      </div>

      {/* Modal for full text */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Full Description</h2>
            <p>{description}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardroomDescription;
