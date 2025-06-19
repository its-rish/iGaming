import React from "react";

interface loadingProps{
    loadingText?:string;
}

function CustomLoading({loadingText}:loadingProps) {
  return (
  <div className="flex items-center justify-center top-0 left-0 bg-[#0000004e] fixed w-full h-screen z-50">
   <svg height="100" stroke="#bac736" stroke-width="2" className="text-line" width="100%"><text x="50%" dominant-baseline="middle" text-anchor="middle" y="50%">Loading Article</text></svg>
  </div>
  );
}

export default CustomLoading;
