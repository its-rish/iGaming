"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TechnologySection from "./TechnologySection";
import Newsletter from "./Newsletter";
import TopContributors from "./TopContributors";
import SocialMediaLinks from "./SocialMediaLinks";
import { gql } from "@apollo/client";
import NewsArticleCardSkeleton from "./Skeleton/NewsArticleCard";
import TechnologySectionSkeleton from "./Skeleton/TechnologySectionSkeleton";
import StafsPickSkeletonCard from "./Skeleton/StafsPickSkeletonCard";

// TypeScript interfaces for article data
export interface StrapiArticle {
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

export interface ArticleUI {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  imageUrl: string;
  link: string;
  author: string;
  raw: any;
}

// Helper to get category color
export const getCategoryColor = (category: string) => {
  switch ((category || "").toUpperCase()) {
    case "SPORT":
      return "text-orange-500";
    case "TECHNOLOGY":
      return "text-purple-500";
    case "BUSINESS":
      return "text-yellow-500";
    case "LIFESTYLE":
      return "text-green-500";
    case "SHOWBIZ":
      return "text-teal-500";
    default:
      return "text-blue-500";
  }
};

// Helper to extract category name
function getCategoryName(category: any): string {
  return category?.data?.attributes?.name ?? category?.name ?? "Uncategorized";
}

// Helper to extract author name
function getAuthorName(author: any): string {
  return author?.data?.attributes?.name ?? author?.name ?? "Unknown";
}

const NewsSection = () => {
  const [articles, setArticles] = useState<StrapiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://harmonious-surprise-60a0828505.strapiapp.com/api/articles?populate[cover][fields][0]=url&populate[category][fields][0]=name&populate[category][populate][articles][fields][0]=documentId&populate[category][populate][articles][fields][1]=title&populate[category][populate][articles][fields][2]=slug&populate[category][populate][articles][fields][3]=date&populate[category][populate][articles][fields][4]=raw&populate[category][populate][articles][populate][imageUrl][fields][0]=url&populate[category][populate][articles][populate][cover][fields][0]=url&populate[category][populate][articles][populate][author][fields][0]=name&populate[category][populate][articles][populate][author][populate][profile][fields][0]=url"
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load articles");
        setLoading(false);
      });
  }, []);

  // Map Strapi data to UI format
  const mapArticle = (article: StrapiArticle): ArticleUI => {
    const attr = article.attributes || (article as any);
    return {
      id: article.id,
      title: attr.title,
      slug: attr.slug || "", // <-- Add this
      category: getCategoryName(attr.category),
      date: attr.date || attr.publishedAt || "",
      imageUrl: attr.cover?.url || "https://picsum.photos/800/400",
      link: `/article/${attr.slug || article.id}`, // <-- Updated to use slug
      author: getAuthorName(attr.author),
      raw: article,
    };
  };

  // Filter for sections
  const happeningToday: ArticleUI[] = articles.slice(0, 5).map(mapArticle);
  const staffPicks: ArticleUI[] = articles.slice(0, 8).map(mapArticle);
  const technologyPosts: ArticleUI[] = articles
    .filter((article) => {
      const attr = article.attributes || article;
      const catName = getCategoryName(attr.category);
      return catName.toLowerCase() === "technology";
    })
    .map(mapArticle);
  const businessPosts: ArticleUI[] = articles
    .filter((article) => {
      const attr = article.attributes || article;
      const catName = getCategoryName(attr.category);
      return catName.toLowerCase() === "business";
    })
    .map(mapArticle);
  const sportsPosts: ArticleUI[] = articles
    .filter((article) => {
      const attr = article.attributes || article;
      const catName = getCategoryName(attr.category);
      return catName.toLowerCase() === "sport";
    })
    .map(mapArticle);

  // if (loading) return <div className="text-white p-8">Loading articles...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  // News Article Card Component
  const NewsArticleCard = ({ article }: { article: ArticleUI }) => (
    <Link
      href={article.link}
      className="block group pb-6 mb-6 border-b border-gray-700"
    >
      {/* Desktop layout (side by side) */}
      <div className="hidden md:flex">
        <div className="w-1/2">
          <div className="relative h-64 w-full">
            <Image
              src={article.imageUrl || "https://picsum.photos/800/400"}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 pl-4 flex flex-col justify-start pt-4">
          <div className="mb-1">
            <span
              className={`inline-block font-semibold uppercase ${getCategoryColor(
                article.category
              )} text-sm font-inter`}
            >
              {article.category}
            </span>
          </div>
          <p className="text-xs text-gray-500 uppercase mb-2 font-inter">
            {article.date ? new Date(article.date).toLocaleDateString() : ""}
          </p>
          <h3 className="text-4xl  tracking-wide leading-11 text-white font-anton">
            {article.title}
          </h3>
        </div>
      </div>
      {/* Mobile layout (stacked) */}
      <div className="md:hidden">
        <div className="w-full">
          <div className="relative h-64 w-full">
            <Image
              src={article.imageUrl || "https://picsum.photos/800/400"}
              alt={article.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full mt-3">
          <div className="mb-1">
            <span
              className={`inline-block font-semibold ${getCategoryColor(
                article.category
              )} text-sm font-inter`}
            >
              {article.category}
            </span>
          </div>
          <p className="text-xs text-gray-500 uppercase mb-2 font-inter">
            {article.date ? new Date(article.date).toLocaleDateString() : ""}
          </p>
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
              src={pick.imageUrl || "https://picsum.photos/800/400"}
              alt={pick.title}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-2/3 pl-3 flex flex-col justify-start">
          <div className="mb-1">
            <span
              className={`inline-block uppercase ${getCategoryColor(
                pick.category
              )} text-xs font-inter`}
            >
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
              src={pick.imageUrl || "https://picsum.photos/800/400"}
              alt={pick.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full mt-2">
          <div className="mb-1">
            <span
              className={`inline-block ${getCategoryColor(
                pick.category
              )} text-xs font-semibold font-inter`}
            >
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter">
                Happening Today!
              </h2>
              <div>
                {loading
                  ? Array.from({ length: 6 }).map((_, index: number) => (
                      <NewsArticleCardSkeleton key={index} />
                    ))
                  : happeningToday.map((article) => (
                      <NewsArticleCard key={article.id} article={article} />
                    ))}

                {/* Read All Posts Button */}
                <Link
                  href="/all-posts"
                  className="block w-full bg-[#ff5733] hover:bg-[#e04b2a] text-white text-center py-4 mt-8"
                >
                  <span className="md:text-xl lg:text-xl  uppercase font-anton">
                    Read All Post
                  </span>
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
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-7">
                  {Array.from({ length: 2 }).map((_, index: number) => (
                    <TechnologySectionSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <TechnologySection
                  title="What's Hot In Technology"
                  posts={technologyPosts}
                />
              )}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-7">
                  {Array.from({ length: 3 }).map((_, index: number) => (
                    <TechnologySectionSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <TechnologySection
                  title="What's hot in Sports"
                  posts={sportsPosts}
                  noBorder={true}
                />
              )}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-7">
                  {Array.from({ length: 2 }).map((_, index: number) => (
                    <TechnologySectionSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <TechnologySection
                  title="What's hot in Business"
                  posts={businessPosts}
                />
              )}
            </div>
          </div>
          {/* Right Column - Staff Picks & Contributors */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-15 bg-[#181818]">
              {/* Staff Picks */}
              <div className="p-4 md:px-10 md:py-10">
                <h3 className="text-5xl sm:text-3xl md:text-3xl lg:text-5xl mb-4 sm:mb-6 uppercase font-anton">
                  Staff Picks
                </h3>
                <div className="space-y-4">
                  {loading ? (
                    <div className="flex flex-col gap-1.5">
                      {Array.from({ length: 5 }).map((_, index: number) => (
                        <StafsPickSkeletonCard key={index} />
                      ))}
                    </div>
                  ) : (
                    staffPicks.map((pick) => (
                      <StaffPickCard key={pick.id} pick={pick} />
                    ))
                  )}
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
