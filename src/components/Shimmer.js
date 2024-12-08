import React from "react";

const Shimmer = ({ className }) => {
  return (
    <div className={`bg-gray-200 animate-pulse ${className}`} />
  );
};

export default Shimmer;
