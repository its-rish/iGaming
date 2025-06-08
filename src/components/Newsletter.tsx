"use client";

import React from 'react';

interface NewsletterProps {
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ className = "" }) => {
  return (
    <div className={`p-4 md:p-10 bg-[#F1D96D] text-black ${className}`}>
      <div className="mb-2">
        <h3 className="text-xs text-gray-800 font-bold uppercase font-inter">Never miss a thing!</h3>
        <h2 className="text-xl  mt-2 leading-tight font-anton">Subscribe and get freshly baked articles. Join the community!</h2>
        <p className="text-sm py-2 text-gray-800 font-inter">Join the newsletter to receive the latest updates in your inbox.</p>
      </div>

      <form className="space-y-2">
        <input
          type="email"
          placeholder="name@email.com"
          className="w-full p-3 bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none text-sm font-inter"
        />
        <button
          type="submit"
          className="w-full bg-[#ff5733] hover:bg-[#e04b2a] text-white font-bold py-3 text-sm uppercase font-inter"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
