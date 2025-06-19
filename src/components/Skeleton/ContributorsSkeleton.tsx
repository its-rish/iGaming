import React from "react";

function ContributorsSkeleton() {
  return (
    <div className="animate-pulse p-1 rounded-md  bg-black w-full mx-auto">
      <div className="bg-gray-700 h-20 w-full  rounded-md "></div>
      <div className="w-full mt-1.5">
        <div className="h-1.5 bg-gray-600 max-w-34 w-full mx-auto rounded"></div>
      </div>
    </div>
  );
}

export default ContributorsSkeleton;
