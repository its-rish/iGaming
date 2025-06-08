"use client";

import React from 'react';
import Image from 'next/image';

// Contributor type definition
interface Contributor {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

interface TopContributorsProps {
  className?: string;
  titleClassName?: string;
}

// Default contributors data
const defaultContributors = [
  {
    id: 1,
    name: "Juliana",
    role: "News Editor",
    imageUrl: "https://picsum.photos/id/1027/300/300"
  },
  {
    id: 2,
    name: "Elissa Medina",
    role: "News Editor",
    imageUrl: "https://picsum.photos/id/1025/300/300"
  },
  {
    id: 3,
    name: "Jony Kurniawan",
    role: "News Editor",
    imageUrl: "https://picsum.photos/id/1012/300/300"
  }
];

const TopContributors: React.FC<TopContributorsProps> = ({
  className = "",
  titleClassName = ""
}) => {
  return (
    <div className={className}>
      <div className="md:px-10 px-4 pt-6">
        <h3 className={`text-5xl sm:text-3xl md:text-5xl mb-4 uppercase font-anton ${titleClassName}`}>Top Contributors</h3>
      </div>
      <div className="md:px-10 px-4 py-2">
        <div className="grid grid-cols-3 gap-2">
          {defaultContributors.map((contributor) => (
            <div key={contributor.id} className="text-center">
              <div className="relative w-full aspect-square">
                <Image
                  src={contributor.imageUrl}
                  alt={contributor.name}
                  fill
                  sizes="(max-width: 1024px) 33vw, 11vw"
                  className="object-cover"
                />
              </div>
              <h4 className="text-xs font-semibold text-white mt-1 font-inter">{contributor.name}</h4>
              <p className="text-[0.6em] text-gray-400 mb-2 font-inter">{contributor.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopContributors;
