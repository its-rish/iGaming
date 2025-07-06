"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContributorsSkeleton from "./Skeleton/ContributorsSkeleton";

// Default contributors data
const defaultContributors = [
  {
    id: 1,
    name: "Juliana",
    role: "News Editor",
    imageUrl: "https://picsum.photos/id/1027/300/300",
  },
  {
    id: 2,
    name: "Elissa Medina",
    role: "News Editor",
    imageUrl: "https://picsum.photos/id/1025/300/300",
  },
  {
    id: 3,
    name: "Jony Kurniawan",
    role: "News Editor",
    imageUrl: "https://picsum.photos/id/1012/300/300",
  },
];
interface TopContributorsProps {
  className?: string;
  titleClassName?: string;
}
export interface autherDetailsUI {
  id: number;
  name: string;
  role: string;
  profile: string;
  slug: string;
}
export interface StrapiAuthor {
  id: number;
  attributes: {
    name: string;
    slug?: string;
    jobTitle?: string;
    profile?: { url: string };
  };
}

const TopContributors: React.FC<TopContributorsProps> = ({
  className = "",
  titleClassName = "",
}) => {
  const [contributer, setContributer] = useState<StrapiAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch(
      "https://harmonious-surprise-60a0828505.strapiapp.com/api/authors?populate=*"
    )
      .then((res) => res.json())

      .then((data) => {
        setContributer(data.data || []);
        setLoading(false);
      })

      .catch(() => {
        setError("Failed to load articles");
        setLoading(false);
      });
  }, []);

  const mapContributer = (contribute: StrapiAuthor): autherDetailsUI => {
    const attr = contribute.attributes || (contribute as any);

    return {
      id: contribute.id,
      name: attr.name,
      slug: attr.slug || "",
      role: attr.jobTitle || "no-role",
      profile: attr.profile?.url || "https://picsum.photos/800/400",
    };
  };

  const contributerList: autherDetailsUI[] = contributer
    .slice(0, 3)
    .map(mapContributer);

  if (error) return <div className="text-red-500 p-8">{error}</div>;


  return (
    <div className={className}>
      <div className="md:px-10 px-4 pt-6">
        <h3
          className={`text-5xl sm:text-3xl md:text-5xl mb-4 uppercase font-anton ${titleClassName}`}
        >
          Top Contributors
        </h3>
      </div>
      <div className="md:px-10 px-4 py-2">
        <div className="grid grid-cols-3 gap-2">
          {
            loading?(
              Array.from({length:3}).map((_,index:number)=>(
                <ContributorsSkeleton key={index}/>
              ))
            ):(
contributerList.map((contributor) => (
            <div key={contributor.id} className="text-center">
              <div className="relative w-full aspect-square">
                <Image
                  src={contributor.profile}
                  alt={contributor.name}
                  fill
                  sizes="(max-width: 1024px) 33vw, 11vw"
                  className="object-cover"
                />
              </div>
              <h4 className="text-xs font-semibold text-white mt-1 font-inter">
                {contributor.name}
              </h4>
              <p className="text-[0.6em] text-gray-400 mb-2 font-inter">
                {contributor.role}
              </p>
            </div>
          ))
            )
          }
         
        </div>
      </div>
    </div>
  );
};

export default TopContributors;
