"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TechnologySection from './TechnologySection';
import Newsletter from './Newsletter';
import TopContributors from './TopContributors';
import SocialMediaLinks from './SocialMediaLinks';

// TypeScript interfaces for article data
interface StrapiArticle {
  id: number;
  attributes: {
    title: string;
    slug?: string;
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
  author: string;
  raw: any;
}

// Helper to get category color
const getCategoryColor = (category: string) => {
  switch ((category || '').toUpperCase()) {
    case 'SPORT':
      return 'text-orange-500';
    case 'TECHNOLOGY':
      return 'text-purple-500';
    case 'BUSINESS':
      return 'text-yellow-500';
    case 'HEALTH':
      return 'text-green-500';
    case 'ENVIRONMENT':
      return 'text-teal-500';
    default:
      return 'text-blue-500';
  }
};

// Helper to extract category name
function getCategoryName(category: any): string {
  if (!category) return 'Uncategorized';
  if ('data' in category && category.data?.attributes?.name) return category.data.attributes.name;
  if ('name' in category && category.name) return category.name;
  return 'Uncategorized';
}

// Helper to extract author name
function getAuthorName(author: any): string {
  if (!author) return 'Unknown';
  if ('data' in author && author.data?.attributes?.name) return author.data.attributes.name;
  if ('name' in author && author.name) return author.name;
  return 'Unknown';
}

const NewsSection = () => {
  const [articles, setArticles] = useState<StrapiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:1337/api/articles')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArticles(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load articles');
        setLoading(false);
      });
  }, []);

  // Map Strapi data to UI format
  const mapArticle = (article: StrapiArticle): ArticleUI => {
    const attr = article.attributes || (article as any);
    return {
      id: article.id,
      title: attr.title,
      category: getCategoryName(attr.category),
      date: attr.date || attr.publishedAt || '',
      imageUrl: attr.imageUrl || attr.cover?.url || 'https://picsum.photos/800/400',
      link: attr.slug ? `/article/${attr.slug}` : `/article/${article.id}`,
      author: getAuthorName(attr.author),
      raw: article,
    };
  };

  // Filter for sections
  const happeningToday: ArticleUI[] = articles.slice(0, 5).map(mapArticle);
  const staffPicks: ArticleUI[] = articles.slice(5, 8).map(mapArticle);
  const technologyPosts: ArticleUI[] = articles.filter((a) => getCategoryName(a.attributes?.category).toLowerCase() === 'technology').map(mapArticle);
  const businessPosts: ArticleUI[] = articles.filter((a) => getCategoryName(a.attributes?.category).toLowerCase() === 'business').map(mapArticle);
  const healthPosts: ArticleUI[] = articles.filter((a) => getCategoryName(a.attributes?.category).toLowerCase() === 'health').map(mapArticle);

  if (loading) return <div className="text-white p-8">Loading articles...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  // News Article Card Component
  const NewsArticleCard = ({ article }: { article: ArticleUI }) => (
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
            <span className={`inline-block font-semibold ${getCategoryColor(article.category)} text-sm font-inter`}>
              {article.category}
            </span>
          </div>
          <p className="text-xs text-gray-500 uppercase mb-2 font-inter">{article.date ? new Date(article.date).toLocaleDateString() : ''}</p>
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
            <span className={`inline-block font-semibold ${getCategoryColor(article.category)} text-sm font-inter`}>
              {article.category}
            </span>
          </div>
          <p className="text-xs text-gray-500 uppercase mb-2 font-inter">{article.date ? new Date(article.date).toLocaleDateString() : ''}</p>
          <h3 className="text-4xl text-white font-anton">{article.title}</h3>
        </div>
      </div>
    </Link>
  );

  // Staff Pick Card Component
  const StaffPickCard = ({ pick }: { pick: ArticleUI }) => (
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
            <span className={`inline-block ${getCategoryColor(pick.category)} text-xs font-inter`}>
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
            <span className={`inline-block ${getCategoryColor(pick.category)} text-xs font-semibold font-inter`}>
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

  return (
    <section className="bg-black text-white">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Happening Today */}
          <div className="w-full lg:w-2/3 pt-12 px-4">
            <div className="md:pl-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter">Happening Today!</h2>
              <div>
                {happeningToday.map((article) => (
                  <NewsArticleCard key={article.id} article={article} />
                ))}
                {/* Read All Posts Button */}
                <Link href="/all-posts" className="block w-full bg-[#ff5733] hover:bg-[#e04b2a] text-white text-center py-4 mt-8">
                  <span className="md:text-xl lg:text-xl  uppercase font-anton">Read All Post</span>
                </Link>
              </div>
            </div>
            {/* Banner */}
            <div className="mt-12 md:ml-6 cursor-pointer">
              <div className="relative w-full h-32 sm:h-64">
                <Image
                  src="https://picsum.photos/id/614/1200/400"
                  alt="Exclusive Framer Banner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Technology Sections */}
            <div className="mt-2 md:ml-6">
              <TechnologySection
                title="What's Hot In Technology"
                posts={technologyPosts}
              />
              <TechnologySection
                title="Business Insights"
                posts={businessPosts}
              />
              <TechnologySection
                title="Health & Wellness"
                posts={healthPosts}
                noBorder={true}
              />
            </div>
          </div>
          {/* Right Column - Staff Picks & Contributors */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-15 bg-[#181818]">
              {/* Staff Picks */}
              <div className="p-4 md:px-10 md:py-10">
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

export default NewsSection;
