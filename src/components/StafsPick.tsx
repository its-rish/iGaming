"use client";
import React, { useEffect, useState } from "react";
import { ArticleUI, getCategoryColor, StrapiArticle } from "./NewsSection";
import Link from "next/link";
import Image from "next/image";
import StafsPickSkeletonCard from "./Skeleton/StafsPickSkeletonCard";

// Helper to extract category name
function getCategoryName(category: any): string {
  return category?.data?.attributes?.name ?? category?.name ?? "Uncategorized";
}

// Helper to extract author name
function getAuthorName(author: any): string {
  return author?.data?.attributes?.name ?? author?.name ?? "Unknown";
}

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

function StafsPick() {
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
      link: `/article/${attr.slug || article.id}`,
      author: getAuthorName(attr.author),
      raw: article,
    };
  };
  const staffPicks: ArticleUI[] = articles.slice(0, 8).map(mapArticle);
  return (
    <>
      {loading ? (
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: 5 }).map((_, index: number) => (
            <StafsPickSkeletonCard key={index} />
          ))}
        </div>
      ) : (
        staffPicks.map((pick) => <StaffPickCard key={pick.id} pick={pick} />)
      )}
    </>
  );
}

export default StafsPick;
