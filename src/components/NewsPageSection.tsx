"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Newsletter from './Newsletter';
import TopContributors from './TopContributors';
import SocialMediaLinks from './SocialMediaLinks';

// News Article Card Component
const NewsArticleCard = ({ article }: { article: any }) => {
  return (
    <Link href={article.link} className="block group pb-6 mb-6 border-b border-gray-700">
      {/* Desktop layout (side by side) */}
      <div className="hidden md:flex">
        <div className="w-1/2">
          <div className="relative h-64 w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 pl-4 flex flex-col justify-start pt-4">
          <div className="mb-1">
            <span className={`inline-block font-semibold ${
              article.category === 'SPORT' ? 'text-orange-500' :
              article.category === 'TECHNOLOGY' ? 'text-purple-500' :
              article.category === 'BUSINESS' ? 'text-yellow-500' :
              article.category === 'HEALTH' ? 'text-green-500' :
              article.category === 'ENVIRONMENT' ? 'text-teal-500' :
              'text-blue-500'
            }  text-sm font-inter`}>
              {article.category}
            </span>
          </div>
          <p className="text-xs text-gray-500 uppercase mb-2 font-inter">{article.date}</p>
          <h3 className="text-4xl  tracking-wide leading-11 text-white font-anton">{article.title}</h3>
        </div>
      </div>

      {/* Mobile layout (stacked) */}
      <div className="md:hidden">
        <div className="w-full">
          <div className="relative h-64 w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full mt-3">
          <div className="mb-1">
            <span className={`inline-block font-semibold ${
              article.category === 'SPORT' ? 'text-orange-500' :
              article.category === 'TECHNOLOGY' ? 'text-purple-500' :
              article.category === 'BUSINESS' ? 'text-yellow-500' :
              article.category === 'HEALTH' ? 'text-green-500' :
              article.category === 'ENVIRONMENT' ? 'text-teal-500' :
              'text-blue-500'
            }  text-sm font-inter`}>
              {article.category}
            </span>
          </div>
          <p className="text-xs text-gray-500 uppercase mb-2 font-inter">{article.date}</p>
          <h3 className="text-4xl text-white font-anton">{article.title}</h3>
        </div>
      </div>
    </Link>
  );
};

// Staff Pick Card Component
const StaffPickCard = ({ pick }: { pick: any }) => {
  return (
    <Link href={pick.link} className="block group mb-4">
      {/* Desktop layout */}
      <div className="hidden sm:flex">
        <div className="w-1/3">
          <div className="relative h-24 w-full">
            <Image
              src={pick.imageUrl}
              alt={pick.title}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-2/3 pl-3 flex flex-col justify-start">
          <div className="mb-1">
            <span className={`inline-block ${
              pick.category === 'LIFESTYLE' ? 'text-red-600' :
              pick.category === 'SPORT' ? 'text-blue-600' :
              'text-green-600'
            } text-xs  font-inter`}>
              {pick.category}
            </span>
          </div>
          <h3 className="text-xl font-semibold leading-6 line-clamp-3  text-white font-inter">
            {pick.title}
          </h3>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="sm:hidden">
        <div className="w-full">
          <div className="relative h-40 w-full">
            <Image
              src={pick.imageUrl}
              alt={pick.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full mt-2">
          <div className="mb-1">
            <span className={`inline-block ${
              pick.category === 'LIFESTYLE' ? 'text-red-600' :
              pick.category === 'SPORT' ? 'text-blue-600' :
              'text-green-600'
            } text-xs font-semibold font-inter`}>
              {pick.category}
            </span>
          </div>
          <h3 className="text-xl font-semibold line-clamp-2 text-white font-inter">
            {pick.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

interface StrapiArticle {
  id: number;
  attributes: {
    title: string;
    date?: string;
    publishedAt?: string;
    imageUrl?: string;
    cover?: { url: string };
    category?: { data?: { attributes?: { name: string } } } | { name?: string };
    author?: { data?: { attributes?: { name: string } } } | { name?: string };
  };
}

interface ArticleUI {
  id: number;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  link: string;
  author?: string;
  raw: any;
}

const getCategoryName = (category: any): string => {
  if (!category) return 'Uncategorized';
  if ('data' in category && category.data?.attributes?.name) return category.data.attributes.name;
  if ('name' in category && category.name) return category.name;
  return 'Uncategorized';
};

const getAuthorName = (author: any): string => {
  if (!author) return 'Unknown';
  if ('data' in author && author.data?.attributes?.name) return author.data.attributes.name;
  if ('name' in author && author.name) return author.name;
  return 'Unknown';
};

const NewsPageSection = () => {
  const [articles, setArticles] = useState<ArticleUI[]>([]);
  const [staffPicks, setStaffPicks] = useState<ArticleUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://capable-fellowship-a7bdacc8df.strapiapp.com/api/articles?populate=author,category');
        const data = await res.json();
        const mapped = (data.data || []).map((article: StrapiArticle) => {
          const attr = article.attributes;
          return {
            id: article.id,
            title: attr.title,
            category: getCategoryName(attr.category),
            date: attr.date || attr.publishedAt || '',
            imageUrl: attr.imageUrl || attr.cover?.url || 'https://picsum.photos/800/400',
            link: `/article/${article.id}`,
            author: getAuthorName(attr.author),
            raw: article,
          };
        });
        setArticles(mapped);
        setStaffPicks(mapped.slice(0, 3)); // Example: first 3 as staff picks
        setLoading(false);
      } catch (e) {
        setError('Failed to load articles');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-white p-8">Loading articles...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <section className="bg-black text-white">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - News Articles */}
          <div className="w-full lg:w-2/3 pt-12 px-4">
            <div className="md:pl-6">
              <div>
                {articles.map((article) => (
                  <NewsArticleCard key={article.id} article={article} />
                ))}

                {/* Load More Button */}
                <button className="block w-full bg-[#444444] hover:bg-[#333333] text-white text-center py-4 mt-8">
                  <span className="md:text-md lg:text-lg  uppercase font-anton">Load More</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Staff Picks & Contributors */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-15 bg-[#181818]">
              {/* Staff Picks */}
              <div className="p-10 sm:px-10">
                <h3 className="text-5xl sm:text-3xl md:text-3xl lg:text-5xl mb-4 sm:mb-6 uppercase font-anton">Staff Picks</h3>
                <div className="space-y-4">
                  {staffPicks.map((pick) => (
                    <StaffPickCard key={pick.id} pick={pick} />
                  ))}
                </div>
              </div>

              {/* Top Contributors */}
              <TopContributors />

              {/* Newsletter Subscription */}
              <Newsletter />
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <SocialMediaLinks />
    </section>
  );
};

export default NewsPageSection;
