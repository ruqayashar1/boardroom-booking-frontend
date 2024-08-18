import React from "react";
import { Oval, Puff } from "react-loader-spinner";

const LoaderIndicator = () => {
  return (
    <Puff
      visible={true}
      height="60"
      width="60"
      color="#06ABDD" // Updated color to match your theme
      ariaLabel="loading-indicator"
      secondaryColor="#DD0606" // Optional: Add a secondary color for a gradient effect
      strokeWidth={2} // Thinner stroke for a sleeker look
      strokeWidthSecondary={2} // Matching stroke width for secondary color
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }} // Centering the loader vertically and horizontally
      wrapperClass="loading-spinner" // You can add a custom class for further CSS customization
    />
  );
};

export default LoaderIndicator;
