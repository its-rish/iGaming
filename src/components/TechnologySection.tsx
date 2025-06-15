"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TechnologyPost {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  link: string;
}

interface TechnologySectionProps {
  title: string;
  posts: TechnologyPost[];
  noBorder?: boolean;
}

const TechnologySection: React.FC<TechnologySectionProps> = ({ title, posts, noBorder = false }) => {

  // Function to determine the category slug based on the section title
  const getCategorySlug = () => {
    if (title.toLowerCase().includes('technology')) return 'technology';
    if (title.toLowerCase().includes('business')) return 'business';
    if (title.toLowerCase().includes('lifestyle')) return 'lifestyle';
    if (title.toLowerCase().includes('sport')) return 'sport';
    if (title.toLowerCase().includes('showbiz')) return 'showbiz';

    return 'technology'; // Default fallback
  };

  return (
    <div className={`pt-6 md:py-12 ${noBorder ? '' : 'border-b border-gray-700'}`}>
      <div className="flex justify-between items-center gap-4 mb-6 md:mb-8">
        <h2 className="text-xl sm:text-xl md:text-3xl font-bold  text-white font-inter">{title}</h2>
        <Link
          href={`/categories/${getCategorySlug()}`}
          className="text-red-500 font-semibold text-[10px] md:text-xs uppercase tracking-tight md:tracking-normal whitespace-nowrap font-inter"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`${
              index < posts.length - 1 ? 'md:border-r border-gray-700 md:pr-6' : ''
            } mb-6 md:mb-0`}
          >
            <Link href={`/article/${post.id}`}>
              <div className="relative w-full h-48 mb-3">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-2">
                <p className="text-gray-400 text-xs md:text-xs uppercase mb-1 md:mb-2 font-inter">{post.date}</p>
                <h3 className="text-white text-lg md:text-xl font-anton">{post.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologySection;
