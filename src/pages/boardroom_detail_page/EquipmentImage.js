import React, { useEffect, useState } from "react";
import { base64ToUrl } from "../../functions";
import { ColorRing } from "react-loader-spinner";
import { motion, useAnimation } from "framer-motion";

const EquipmentImage = ({ base64String, equipmentTitle }) => {
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
      const img = new Image();
      img.src = decodedUrl;
      img.onload = () => {
        setLoading(false);
        // controls.start({ opacity: 1, scale: 1 });
      };
      img.onerror = () => setLoading(false); // Handle errors by stopping the loader
    }
  }, [decodedUrl, controls]);

  // Start animation after component mounts
  useEffect(() => {
    if (!loading) {
      controls.start({ opacity: 0.5, scale: 1 });
    }
  }, [loading, controls]);
  return (
    <>
      {loading ? (
        <div className="h-[50vh] flex justify-center items-center bg-gray-200">
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
      ) : (
        <motion.img
          src={decodedUrl}
          alt={equipmentTitle}
          className="object-cover w-full h-full"
          initial={{ opacity: 0, scale: 1 }}
          animate={controls}
          transition={{ duration: 1 }}
        />
      )}
    </>
  );
};

export default EquipmentImage;
