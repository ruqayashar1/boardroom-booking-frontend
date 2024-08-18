import React, { useEffect, useState } from "react";
import { base64ToUrl } from "../../functions";
import { ColorRing } from "react-loader-spinner";
import { motion, useAnimation } from "framer-motion";

const BoardroomImage = ({ base64String }) => {
  const [decodedUrl, setDecodedUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    if (base64String) {
      const url = base64ToUrl(base64String);
      setDecodedUrl(url);
    }
  }, [base64String]);

  useEffect(() => {
    if (decodedUrl) {
      controls.start({ opacity: 0.5, scale: 1.05 });
      const img = new Image();
      img.src = decodedUrl;
      img.onload = () => {
        setLoading(false);
        controls.start({ opacity: 1, scale: 1 });
      };
      img.onerror = () => setLoading(false); // Handle errors by stopping the loader
    }
  }, [decodedUrl, controls]);

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
      <motion.img
        src={decodedUrl}
        alt="boardroom"
        className="h-32 sm:h-48 w-full object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={controls}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default BoardroomImage;
