import React from "react";

function TechnologySectionSkeleton() {
  return (
    <div className="animate-pulse  gap-4 bg-black rounded-md  w-ful">
      <div className="bg-gray-700 h-52 w-full rounded-md mb-4"></div>
      <div className="w-full ">
        <div className="h-2.5 bg-gray-600 w-34 rounded mb-4"></div>
        <div className="h-4 bg-gray-500 w-full rounded mb-2"></div>
        <div className="h-4 bg-gray-500 w-1/2 rounded"></div>
      </div>
    </div>
  );
}

export default TechnologySectionSkeleton;
