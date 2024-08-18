import React, { useEffect, useState } from "react";
import { base64ToUrl } from "../../functions";
import { ColorRing } from "react-loader-spinner";

const BoardroomImage = ({ base64String }) => {
  const [decodedUrl, setDecodedUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (base64String) {
      const url = base64ToUrl(base64String);
      setDecodedUrl(url);
    }
  }, [base64String]);

  useEffect(() => {
    if (decodedUrl) {
      const img = new Image();
      img.src = decodedUrl;
      img.onload = () => setLoading(false);
      img.onerror = () => setLoading(false); // Handle errors by stopping the loader
    }
  }, [decodedUrl]);

  return (
    <div className="relative w-full">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
          <ColorRing
            visible={true}
            height="60"
            width="60"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      <img
        src={decodedUrl}
        alt="boardroom"
        className="h-32 sm:h-48 w-full object-cover"
      />
    </div>
  );
};

export default BoardroomImage;
