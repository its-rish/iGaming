"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "./Newsletter";
import TopContributors from "./TopContributors";
import SocialMediaLinks from "./SocialMediaLinks";
import StafsPick from "./StafsPick";
import { getCategoryColor } from "./NewsSection";
import NewsArticleCardSkeleton from "./Skeleton/NewsArticleCard";

// News Article Card Component
const NewsArticleCard = ({ article }: { article: any }) => {
  return (
    <Link
      href={article.link}
      className="block group pb-6 mb-6 border-b border-gray-700"
    >
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
            <span
              className={`inline-block font-semibold uppercase ${getCategoryColor(
                article.category
              )}  text-sm font-inter`}
            >
              {article.category}
            </span>
          </div>
          <p className="text-xs text-gray-500 uppercase mb-2 font-inter">
            {article.date}
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
            <span
              className={`inline-block font-semibold ${
                article.category === "SPORT"
                  ? "text-orange-500"
                  : article.category === "TECHNOLOGY"
                  ? "text-purple-500"
                  : article.category === "BUSINESS"
                  ? "text-yellow-500"
                  : article.category === "HEALTH"
                  ? "text-green-500"
                  : article.category === "ENVIRONMENT"
                  ? "text-teal-500"
                  : "text-blue-500"
              }  text-sm font-inter`}
            >
              {article.category}
            </span>
          </div>
          <p className="text-xs text-gray-500 uppercase mb-2 font-inter">
            {article.date}
          </p>
          <h3 className="text-4xl text-white font-anton">{article.title}</h3>
        </div>
      </div>
    </Link>
  );
};

interface StrapiArticle {
  id: number;
  attributes: {
    title: string;
    slug: string;
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
  slug: string;
  category: string;
  date: string;
  imageUrl: string;
  link: string;
  author?: string;
  raw: any;
}

const getCategoryName = (category: any): string => {
  if (!category) return "Uncategorized";
  if ("data" in category && category.data?.attributes?.name)
    return category.data.attributes.name;
  if ("name" in category && category.name) return category.name;
  return "Uncategorized";
};

const getAuthorName = (author: any): string => {
  if (!author) return "Unknown";
  if ("data" in author && author.data?.attributes?.name)
    return author.data.attributes.name;
  if ("name" in author && author.name) return author.name;
  return "Unknown";
};

const NewsPageSection = () => {
  const [articles, setArticles] = useState<ArticleUI[]>([]);
  const [staffPicks, setStaffPicks] = useState<ArticleUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://harmonious-surprise-60a0828505.strapiapp.com/api/articles?populate=*"
        );
        const data = await res.json();

        const mapped = (article: StrapiArticle): ArticleUI => {
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

        const mappedArticles = data.data.map(mapped);
        setArticles(mappedArticles);
        setStaffPicks(mappedArticles.slice(0, 3));
        setLoading(false);
      } catch (e) {
        console.error("Fetch error:", e);
        setError("Failed to load articles");
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIdx = (currentPage - 1) * articlesPerPage;
  const currentArticles = articles.slice(startIdx, startIdx + articlesPerPage);

  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <section className="bg-black text-white">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - News Articles */}
          <div className="w-full lg:w-2/3 pt-12 px-4">
            <div className="md:pl-6">
              <div>
                {loading
                  ? Array.from({ length: 6 }).map((_, index: number) => (
                      <NewsArticleCardSkeleton key={index} />
                    ))
                  : currentArticles.map((article) => (
                      <NewsArticleCard key={article.id} article={article} />
                    ))}

                {/* Load More Button */}

                <div className="flex justify-center items-center mt-8 gap-4">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-[#444444] text-white hover:bg-[#333333] ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Prev
                  </button>

                  <span className="text-white">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-[#444444] text-white hover:bg-[#333333] ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Staff Picks & Contributors */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-15 bg-[#181818]">
              {/* Staff Picks */}
              <div className="p-6 sm:px-10">
                <h3 className="text-5xl sm:text-3xl md:text-3xl lg:text-5xl mb-4 sm:mb-6 uppercase font-anton">
                  Staff Picks
                </h3>
                <div className="space-y-4">
                  <StafsPick />
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
