'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FALLBACK_IMAGE = 'https://via.placeholder.com/600x400?text=Featured';

interface FeaturedPost {
  title: string;
  category: string;
  imageUrl: string;
  link: string;
}

const FeaturedSidebarPost = () => {
  const [featuredPost, setFeaturedPost] = useState<FeaturedPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
          'https://harmonious-surprise-60a0828505.strapiapp.com/api/articles?populate=*&filters[Featured][$eq]=true&pagination[limit]=1&sort=publishedAt:desc'
        );
        const json = await res.json();
        const item = json.data?.[0];
        if (!item) {
          setLoading(false);
          return;
        }

        setFeaturedPost({
          title: item.attributes.title,
          category: item.attributes.category?.name || 'Featured',
          imageUrl: item.attributes.cover?.url || FALLBACK_IMAGE,
          link: `/articles/${item.attributes.slug}`,
        });

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <div className="sticky top-15 bg-[#181818] animate-pulse">
          <div className="w-full h-96 bg-gray-700 rounded-lg m-4" />
          <div className="p-4">
            <div className="h-8 w-32 bg-gray-700 mb-4 rounded" />
            <div className="h-6 w-3/4 bg-gray-700 mb-2 rounded" />
            <div className="h-6 w-2/4 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!featuredPost) return null;

  return (
    <div className="w-full ">
      <div className="sticky top-15 bg-[#181818]">
        {/* Featured Image */}
        <div className="relative w-full h-96 p-4">
          <Image
            src={featuredPost.imageUrl}
            alt={featuredPost.title || 'Featured post'}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover p-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = FALLBACK_IMAGE;
            }}
          />
        </div>

        {/* Featured Post */}
        <div className="p-4">
          <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 uppercase text-white">
            Featured Post
          </h3>
          <Link href={featuredPost.link} className="block pb-4">
            <div className="mb-2">
              <span className="inline-block font-semibold text-purple-500 text-sm">
                {featuredPost.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white hover:underline line-clamp-2">
              {featuredPost.title}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSidebarPost;
