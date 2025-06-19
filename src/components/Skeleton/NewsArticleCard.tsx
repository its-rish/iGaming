import React from 'react'

function NewsArticleCardSkeleton() {
  return (
  <div className="animate-pulse flex items-center gap-4 bg-black p-4 max-w-3xl mx-auto">
                        <div className="bg-gray-700 h-64 w-full max-w-1/2 rounded-md mb-4"></div>
                        <div className="w-full max-w-1/2">
                          <div className="h-4 bg-gray-600 w-34 rounded mb-2"></div>
                          <div className="h-3 bg-gray-600 w-24 rounded mb-4"></div>
                          <div className="h-6 bg-gray-500 w-full rounded mb-2"></div>
                          <div className="h-6 bg-gray-500 w-2/3 rounded mb-2"></div>
                          <div className="h-6 bg-gray-500 w-1/2 rounded"></div>
                        </div>
                      </div>
  )
}

export default NewsArticleCardSkeleton