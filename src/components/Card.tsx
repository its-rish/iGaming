import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  category: string;
  date?: string;
  imageUrl: string;
  link: string;
}

const Card = ({ title, category, imageUrl, link }: CardProps) => {
  // Determine category color
  const getCategoryColor = (category: string) => {
    switch (category.toUpperCase()) {
      case 'LIFESTYLE':
        return 'bg-red-600';
      case 'SPORT':
        return 'bg-blue-600';
      case 'TECHNOLOGY':
        return 'bg-green-600';
      default:
        return 'bg-purple-600';
    }
  };

  return (
    <Link href={link} className="block group ">
      <div className="flex bg-transparent overflow-hidden mb-4">
        {/* Left side - Image */}
        <div className="relative h-16 w-24 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 24vw, 10vw"
            className="object-cover"
          />
        </div>

        {/* Right side - Content */}
        <div className="pl-3 flex flex-col justify-between flex-grow">
          {/* Category tag */}
          <div className="mb-1">
            <span className={`inline-block ${getCategoryColor(category)} text-white text-xs font-medium px-2 py-0.5`}>
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold line-clamp-2 text-white">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
