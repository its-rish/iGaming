import React from 'react';
import TodaysUpdate from '@/components/TodaysUpdate';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import TopContributors from '@/components/TopContributors';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';
import Link from 'next/link';
import SocialMediaLinks from '@/components/SocialMediaLinks';

// Helper to get category color
function getCategoryColor(category: string) {
  switch ((category || '').toLowerCase()) {
    case 'technology': return 'text-purple-500';
    case 'business': return 'text-yellow-500';
    case 'health': return 'text-green-500';
    default: return 'text-red-500';
  }
}
interface PageProps {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${categoryName} - Framagz`,
    description: `Stay updated with the latest ${category} news and articles.`,
    keywords: `${category}, news, articles, latest updates`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  // Fetch articles by category
  const res = await fetch(`https://capable-fellowship-a7bdacc8df.strapiapp.com/api/articles?filters[category][name][$eq]=${category}&populate=*`);
  const data = await res.json();


const articles = (data.data || []).map((article: any) => {
    const imageUrl =
      article.imageUrl?.url ||
      article.cover?.url ||
      'https://picsum.photos/800/400';

    return {
      id: article.id,
      title: article.title,
      date: article.date || article.publishedAt || '',
    category: article.category?.name || 'Unknown',
      imageUrl: imageUrl.startsWith('http')
        ? imageUrl
        : `https://capable-fellowship-a7bdacc8df.media.strapiapp.com${imageUrl}`,
      link: `/article/${article.slug }`,
    };
  });

  
  // Format category name for display
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const categoryColorClass = getCategoryColor(category);
  const todaysUpdateText = categoryName.toUpperCase();
  const bgColor = "#B7386F";
  // Staff picks and contributors can be left as-is or fetched similarly
  return (
    <>
      <TodaysUpdate text={todaysUpdateText} bgColor={bgColor} />
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Column - Category Posts */}
          <div className="w-full lg:w-2/3 pt-12 px-4">
            <div className="md:pl-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-white">
                Latest in {categoryName}
              </h2>
              <div>
                {articles.length === 0 && <div>No articles found in this category.</div>}
                {articles.map((article: any) => (
                  <Link key={article.id} href={article.link} className="block group pb-6 mb-6 border-b border-gray-700">
                    <div className="hidden md:flex">
                      <div className="w-1/2">
                        <div className="relative h-64 w-full">
                          <Image src={article.imageUrl} alt={article.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                        </div>
                      </div>
                      <div className="w-1/2 pl-4 flex flex-col justify-start pt-4">
                        <div className="mb-1">
                          <span className={`inline-block font-semibold ${categoryColorClass} text-sm`}>
                            {article.category.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 uppercase mb-2">{article.date ? new Date(article.date).toLocaleDateString() : ''}</p>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-3">{article.title}</h3>
                      </div>
                    </div>
                    <div className="md:hidden">
                      <div className="w-full">
                        <div className="relative h-64 w-full">
                          <Image src={article.imageUrl} alt={article.title} fill sizes="100vw" className="object-cover" />
                        </div>
                      </div>
                      <div className="w-full mt-3">
                        <div className="mb-1">
                          <span className={`inline-block font-semibold ${categoryColorClass} text-sm`}>
                            {article.category.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 uppercase mb-2">{article.date ? new Date(article.date).toLocaleDateString() : ''}</p>
                        <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
                {/* Load More Button */}
                <button className="block w-full bg-[#444444] hover:bg-[#333333] text-white text-center py-4 mt-8">
                  <span className="md:text-md lg:text-md font-bold uppercase">Load More</span>
                </button>
              </div>
            </div>
          </div>
          {/* Right Column - Staff Picks & Contributors */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-15 bg-[#181818]">
              {/* Staff Picks */}
              <div className="p-10 sm:px-10">
                <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 uppercase">Staff Picks</h3>
                {/* You can fetch staff picks from Strapi if needed */}
                <div className="space-y-4">
                  {/* ...existing code for staff picks... */}
                </div>
              </div>
              <TopContributors />
              <Newsletter />
            </div>
          </div>
        </div>
      </div>
      <SocialMediaLinks />
      <Footer />
    </>
  );
}
