"use client";

import React from 'react';
import Link from 'next/link';
import { Camera, MessageCircle, MessagesSquare, Video, Rss } from 'lucide-react';

interface SocialMediaLinksProps {
  className?: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ className = "" }) => {
  return (
    <div className={`mt-12 ${className}`} style={{ borderTop: '2px solid rgba(255, 255, 255, 0.3)', borderBottom: '2px solid rgba(255, 255, 255, 0.3)' }}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <Link href="https://instagram.com" className="text-white hover:text-red-500 flex items-center">
            <Camera size={20} />
            <span className="ml-2 text-xs uppercase font-inter">Instagram</span>
          </Link>
          <Link href="https://facebook.com" className="text-white hover:text-red-500 flex items-center">
            <MessageCircle size={20} />
            <span className="ml-2 text-xs uppercase font-inter">Facebook</span>
          </Link>
          <Link href="https://twitter.com" className="text-white hover:text-red-500 flex items-center">
            <MessagesSquare size={20} />
            <span className="ml-2 text-xs uppercase font-inter">Twitter</span>
          </Link>
          <Link href="https://youtube.com" className="text-white hover:text-red-500 flex items-center">
            <Video size={20} />
            <span className="ml-2 text-xs uppercase font-inter">Youtube</span>
          </Link>
          <Link href="/rss" className="text-white hover:text-red-500 flex items-center">
            <Rss size={20} />
            <span className="ml-2 text-xs uppercase font-inter">RSS Feed</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
