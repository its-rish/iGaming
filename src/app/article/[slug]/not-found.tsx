import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Article Not Found</h1>
        <p className="text-xl md:text-2xl mb-8">
          Sorry, the article you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="bg-[#ff5733] hover:bg-[#e04b2a] text-white font-bold py-3 px-6 text-center"
          >
            Return Home
          </Link>
          <Link 
            href="/news" 
            className="bg-[#444444] hover:bg-[#333333] text-white font-bold py-3 px-6 text-center"
          >
            Browse News
          </Link>
        </div>
      </div>
    </div>
  );
}
