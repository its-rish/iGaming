import React from 'react'

function StafsPickSkeletonCard() {
  return (
   <div className="animate-pulse flex items-center gap-2 p-2 rounded-md  bg-black w-full mx-auto">
                        <div className="bg-gray-700 h-20 w-full max-w-[30%] rounded-md "></div>
                        <div className="w-full max-w-[70%]">
                          <div className="h-1.5 bg-gray-600 w-34 rounded mb-3"></div>
                          <div className="h-3 bg-gray-500 w-full rounded mb-1"></div>
                          <div className="h-3 bg-gray-500 w-1/2 rounded"></div>
                        </div>
                      </div>
  )
}

export default StafsPickSkeletonCard