import React, { ReactElement } from 'react';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Newsletter from '@/components/Newsletter';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import TechnologySection from '@/components/TechnologySection';

// Types for our data structures
type Author = {
  name: string;
  imageUrl: string;
};

type Block = {
  type: string;
  children: { text: string }[];
} | string;

type Article = {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  author: Author;
  content: Block[];
};

type RelatedPost = {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  link: string;
};

type FeaturedPost = {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  link: string;
};

// Sample static data for fallback and testing
const sampleArticles = [
  {
    id: 1,
    slug: "1",
    title: "Scandal Erupts After Allegations of Doping in International Athletics",
    category: "SPORT",
    date: "MONDAY, DECEMBER 9, 2024",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      name: "Jony Kurniawan",
      imageUrl: "https://picsum.photos/id/1012/300/300"
    },
    content: [
      {
        type: 'paragraph',
        children: [{ text: 'The world of international athletics was rocked today by explosive allegations of widespread doping among elite competitors. According to documents leaked to major news outlets, several high-profile athletes from multiple countries have been implicated in what appears to be a sophisticated doping program.' }]
      },
      {
        type: 'paragraph',
        children: [{ text: 'The International Athletics Federation (IAF) has announced an immediate investigation into the claims, which suggest that certain athletes may have been using performance-enhancing substances that are currently undetectable by standard testing protocols.' }]
      }
      // Add more content blocks as needed
    ]
  }
];

// Sample related posts
const sampleRelatedPosts = [
  {
    id: 3,
    title: "Breakthrough AI Model Promises to Revolutionize Healthcare",
    date: "DECEMBER 7, 2024",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/article/3"
  },
  {
    id: 4,
    title: "Global Stocks Surge as Markets React to Tech Sector Boom",
    date: "DECEMBER 4, 2024",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/article/4"
  }
];

// Sample featured post
const sampleFeaturedPost = {
  id: 6,
  title: "Breakthrough AI Model Promises to Revolutionize Healthcare",
  category: "TECHNOLOGY",
  imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  link: "/article/6"
};

// Helper to extract author name
function getAuthorName(author: any): string {
  if (!author) return 'Unknown';
  if ('data' in author && author.data?.attributes?.name) return author.data.attributes.name;
  if ('name' in author && author.name) return author.name;
  return 'Unknown';
}

// Helper to format date consistently
function formatDate(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).toUpperCase();
  } catch (e) {
    return '';
  }
}

// Helper to render content blocks
function renderContent(content: Block[]): ReactElement[] {
  return content.map((block, idx) => {
    if (typeof block === 'string') {
      return <div key={idx} dangerouslySetInnerHTML={{ __html: block }} />;
    }
    
    if (block.type === 'paragraph' && Array.isArray(block.children)) {
      return (
        <p key={idx} className="mb-4 text-white">
          {block.children.map((child, cidx) => child.text || '').join('')}
        </p>
      );
    }
    return null;
  }).filter(Boolean) as ReactElement[];
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params

  try {
    // Try to fetch from Strapi first
    const res = await fetch(`https://capable-fellowship-a7bdacc8df.strapiapp.com/api/articles?filters[slug][$eq]=${slug}&populate[author][populate]=image`);
    const data = await res.json();
    const article = data.data?.[0];

    if (article) {
      const attr = article.attributes ?? {};
      return {
        title: `${attr.title || 'Untitled'} - Framagz`,
        description: attr.excerpt || attr.title || 'No description available.',
        keywords: `${(attr.title || 'article').toLowerCase()}, news, articles`,
      };
    }

    // Fallback to static data
    const staticArticle = sampleArticles.find(article => article.slug === slug);
    if (staticArticle) {
      return {
        title: `${staticArticle.title} - Framagz`,
        description: `Read about ${staticArticle.title} and stay updated with the latest news.`,
        keywords: `${staticArticle.category.toLowerCase()}, news, articles, ${staticArticle.title.toLowerCase()}`,
      };
    }

    return {
      title: 'Article Not Found - Framagz',
      description: 'The requested article could not be found.',
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: 'Error - Framagz',
      description: 'An error occurred while fetching the article.',
    };
  }
}

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params

  try {
    // Try to fetch from Strapi first
    const res = await fetch(`https://capable-fellowship-a7bdacc8df.strapiapp.com/api/articles?filters[slug][$eq]=${slug}&populate=*`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch from Strapi: ${res.statusText}`);
    }

    const data = await res.json();
    const strapiArticle = data.data?.[0];

    // Determine if we're using Strapi data or static data
    const isStatic = !strapiArticle;
    const article = strapiArticle || sampleArticles.find(a => a.slug === slug);

    if (!article) return notFound();

    const attr = strapiArticle ? (article.attributes || {}) : article;
    const content = article.content;
    // const content = (strapiArticle ? (attr.content || []) : article.content) || [];
    
    // Handle author data with fallback values
    const authorData = strapiArticle 
      ? { 
          name: getAuthorName(attr.author),
          imageUrl: attr.author?.data?.attributes?.image?.data?.attributes?.url 
            ? `http://localhost:1337${attr.author.data.attributes.image.data.attributes.url}`
            : 'https://picsum.photos/300/300'
        }
      : article.author;

    // Get image URL
    const imageUrl = strapiArticle
      ? (attr.image?.data?.attributes?.url 
          ? `http://localhost:1337${attr.image.data.attributes.url}` 
          : 'https://picsum.photos/800/400')
      : article.imageUrl;

    // Use sample data for related and featured posts for now
    const relatedPosts = sampleRelatedPosts;
    const featuredPost = sampleFeaturedPost;

    // Get category color
    const getCategoryColor = (category: string) => {
      switch (category?.toUpperCase?.()) {
        case 'SPORT': return 'text-[#FF6038]';
        case 'TECHNOLOGY': return 'text-[#6B46C1]';
        case 'BUSINESS': return 'text-[#EAB308]';
        case 'HEALTH': return 'text-[#22C55E]';
        default: return 'text-[#FF6038]';
      }
    };

    const categoryName = strapiArticle 
      ? (attr.category?.data?.attributes?.name || 'Uncategorized')
      : article.category;
    const categoryColor = getCategoryColor(categoryName);

    // Get date
    const date = strapiArticle 
      ? (attr.publishedAt ? formatDate(attr.publishedAt) : '')
      : formatDate(article.date);

    return (
      <>
        <div className="bg-black text-white">
          {/* Header with category and date */}
          <div className="container mx-auto mt-8 px-4 py-2">
            <div className="flex items-center justify-center">
              <span className={`${categoryColor} font-medium mr-2`}>{categoryName}</span>
              <span className="text-gray-400 text-sm">• {date}</span>
            </div>
          </div>
          {/* Article Title */}
          <div className="container mx-auto px-4 py-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight">
              {attr.title}
            </h1>
          </div>
          {/* Author Info */}
          <div className="container mx-auto px-4 py-2 flex justify-center items-center">
            <div className="flex items-center">
              <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                <Image
                  src={authorData.imageUrl}
                  alt={authorData.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="text-white mr-2">By</span>
              <span className="text-white font-medium">{authorData.name}</span>
            </div>
          </div>
          {/* Featured Image */}
          <div className="w-full h-[80vh] relative mt-2">
            <Image
              src={imageUrl}
              alt={attr.title || 'Article featured image'}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          {/* Content Section with Left and Right Columns */}
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Article Content */}
              <div className="w-full lg:w-2/3 pt-12 px-4">
                <div className="md:pl-6">
                  {/* Article Content */}
                  <div className="text-white mb-12">
                    {/* Render content with fallback */}
                    {content.length > 0 ? (
                      renderContent(content)
                    ) : (
                      <p className="text-white">No content available.</p>
                    )}
                  </div>
                  {/* Newsletter */}
                  <div className="mb-12">
                    <Newsletter />
                  </div>
                  {/* Related Posts */}
                  <div>
                    <TechnologySection
                      title="Related Articles"
                      posts={relatedPosts}
                      noBorder={true}
                    />
                  </div>
                </div>
              </div>
              {/* Right Column - Featured Post */}
              {featuredPost && (
                <div className="w-full lg:w-1/3">
                  <div className="sticky top-15 bg-[#181818]">
                    {/* Featured Image */}
                    <div className="relative w-full h-96 p-4">
                      <Image
                        src={featuredPost.imageUrl}
                        alt={featuredPost.title || 'Featured post'}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover p-4"
                      />
                    </div>
                    {/* Featured Post */}
                    <div className="p-4">
                      <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 uppercase">Featured Post</h3>
                      <Link href={featuredPost.link || '#'} className="block pb-4">
                        <div className="mb-2">
                          <span className={`inline-block font-semibold text-purple-500 text-sm`}>
                            {featuredPost.category || 'Featured'}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {featuredPost.title || 'Featured Article'}
                        </h3>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Social Media Links */}
        <SocialMediaLinks />
        {/* Footer */}
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error fetching article data:', error);
    return notFound();
  }
}
