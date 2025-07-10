import React from 'react';
import TodaysUpdate from '@/components/TodaysUpdate';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import TechnologySection from '@/components/TechnologySection';
import TopContributors from '@/components/TopContributors';
import Newsletter from '@/components/Newsletter';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import StafsPick from '@/components/StafsPick';

export const metadata: Metadata = {
  title: 'News - Framagz',
  description: 'Stay updated with the latest news and events from around the world.',
  keywords: 'news, latest news, breaking news, world news, current events',
};

async function getCategoryArticles(category: string) {
  const res = await fetch(
    `https://harmonious-surprise-60a0828505.strapiapp.com/api/articles?filters[category][name][$eq]=${category}&populate=*`
  );

  if (!res.ok) return [];

  const data = await res.json();

  return (data.data || []).map((article: any) => {
    const imageUrl =
      article.imageUrl?.url ||
      article.cover?.url ||
      'https://picsum.photos/800/400';

    return {
      id: article.id,
      title: article.title,
      date: article.date || article.publishedAt || '',
      imageUrl: imageUrl.startsWith('http')
        ? imageUrl
        : `https://harmonious-surprise-60a0828505.media.strapiapp.com${imageUrl}`,
      link: `/article/${article.slug }`,
    };
  });
}


export default async function CategoryPage() {
  // Fetch articles for each section
  const [technologyPosts, businessPosts,sportsPost,ShowbizPosts,lifeStylePosts] = await Promise.all([
    getCategoryArticles('technology'),
    getCategoryArticles('business'),
    getCategoryArticles('sport'),
    getCategoryArticles('showbiz'),
    getCategoryArticles('lifestyle')
  ]);
  const todaysUpdateText = "CATEGORIES";
  const bgColor = "#B7386F";
  return (
    <>
      <TodaysUpdate text={todaysUpdateText} bgColor={bgColor} />
      <div className='container mx-auto '>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Technology Sections */}
          <div className="w-full lg:w-2/3 pt-12 px-4">
            <div className="md:pl-6">
              <TechnologySection
                title="Technology"
                posts={technologyPosts}
              />
               <TechnologySection
                title="Sports"
                posts={sportsPost}
              />
              <TechnologySection
                title="Business"
                posts={businessPosts}
              />
                <TechnologySection
                title="Showbiz"
                posts={ShowbizPosts}
              />
              <TechnologySection
                title="Lifestyle"
                posts={lifeStylePosts}
              />
            </div>
          </div>
          {/* Right Column - Staff Picks & Contributors */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-15 bg-[#181818]">
              {/* Staff Picks */}
              <div className="p-6 sm:px-10">
                <h3 className="text-5xl sm:text-3xl md:text-3xl lg:text-5xl mb-4 sm:mb-6 uppercase font-anton">Staff Picks</h3>
                {/* You can fetch staff picks from Strapi if needed */}
                <div className="space-y-4">
                 <StafsPick />
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