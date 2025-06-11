import React from 'react';
import TodaysUpdate from '@/components/TodaysUpdate';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';
import Link from 'next/link';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import { notFound } from 'next/navigation';
import { Camera, MessageCircle, MessagesSquare, Video } from 'lucide-react';

// Helper to extract name/image from Strapi
function getAuthorName(author: any): string {
  if (!author) return 'Unknown';
  if ('attributes' in author && author.attributes?.name) return author.attributes.name;
  if ('name' in author && author.name) return author.name;
  return 'Unknown';
}
function getAuthorImage(author: any): string {
  if (!author) return '';
  if ('attributes' in author && author.attributes?.imageUrl) return author.attributes.imageUrl;
  if ('imageUrl' in author && author.imageUrl) return author.imageUrl;
  return 'https://picsum.photos/300/300';
}
interface PageProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

// Generate dynamic metadata
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const res = await fetch(`https://capable-fellowship-a7bdacc8df.strapiapp.com/api/authors/${id}`);
  if (!res.ok) {
    return {
      title: 'Author Profile - Framagz',
      description: 'Learn more about our talented authors and read their articles.',
      keywords: 'author, profile, articles, writer, editor, journalist',
    };
  }
  const data = await res.json();
  const author = data.data;
  if (!author) {
    return {
      title: 'Author Profile - Framagz',
      description: 'Learn more about our talented authors and read their articles.',
      keywords: 'author, profile, articles, writer, editor, journalist',
    };
  }
  return {
    title: `${getAuthorName(author)} | Framagz`,
    description: `Learn more about ${getAuthorName(author)} and read their latest articles.`,
    keywords: `${getAuthorName(author)}, author, profile, articles, writer, editor, journalist`,
  };
}

export default async function AuthorDetailPage({ params }: PageProps) {
  const { id } = await params;
  // Fetch author
  const res = await fetch(`https://capable-fellowship-a7bdacc8df.strapiapp.com/api/authors/${id}`);
  if (!res.ok) return notFound();
  const data = await res.json();
  const author = data.data;
  if (!author) return notFound();
  // Fetch articles by this author
  const articlesRes = await fetch(`https://capable-fellowship-a7bdacc8df.strapiapp.com/api/articles?filters[author][id]=${id}`);
  const articlesData = await articlesRes.json();
  const authorArticles = (articlesData.data || []).map((a: any) => {
    const attr = a.attributes;
    return {
      id: a.id,
      title: attr.title,
      category: attr.category?.data?.attributes?.name || 'Uncategorized',
      date: attr.date || attr.publishedAt || '',
      imageUrl: attr.imageUrl || attr.cover?.url || 'https://picsum.photos/800/400',
      link: `/article/${a.id}`,
    };
  });
  return (
    <>
      {/* Today's Update Banner with author profile text and black background */}
      <TodaysUpdate text="AUTHOR PROFILE" bgColor="#000000" />

      <section className="bg-black text-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Author's Articles */}
            <div className="w-full lg:w-2/3 pt-12 px-4">
              <div className="md:pl-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-white">
                  Articles by {getAuthorName(author)}
                </h2>

                <div>
                  {authorArticles.length > 0 ? (
                    authorArticles.map((article: any) => (
                      <Link key={article.id} href={article.link} className="block group pb-6 mb-6 border-b border-gray-700">
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
                              <span className="inline-block font-semibold text-red-500 text-sm">
                                {article.category}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 uppercase mb-2">
                              {article.date ? new Date(article.date).toLocaleDateString() : ''}
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-3">
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
                              <span className="inline-block font-semibold text-red-500 text-sm">
                                {article.category}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 uppercase mb-2">
                              {article.date ? new Date(article.date).toLocaleDateString() : ''}
                            </p>
                            <h3 className="text-xl font-bold text-white mb-2">
                              {article.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-white">No articles found for this author.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Author Info & Newsletter */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-15 bg-[#181818]">
                {/* About Author */}
                <div className="p-10">
                  <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 uppercase">
                    About Author
                  </h3>

                  {/* Author Image */}
                  <div className="relative aspect-square w-full mb-4">
                    <Image
                      src={getAuthorImage(author)}
                      alt={getAuthorName(author)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Author Info */}
                  <h2 className="text-2xl font-bold mb-1">{getAuthorName(author)}</h2>
                  <p className="text-red-500 font-semibold mb-4">{author.attributes?.role || ''}</p>
                  <p className="text-white mb-6">{author.attributes?.description || ''}</p>

                  {/* Author Social Links (if available) */}
                  {author.attributes?.socialLinks && (
                    <div className="flex flex-wrap gap-4">
                      {author.attributes.socialLinks.instagram && (
                        <Link href={author.attributes.socialLinks.instagram} className="text-white hover:text-red-500">
                          <Camera size={20} />
                        </Link>
                      )}
                      {author.attributes.socialLinks.facebook && (
                        <Link href={author.attributes.socialLinks.facebook} className="text-white hover:text-red-500">
                          <MessageCircle size={20} />
                        </Link>
                      )}
                      {author.attributes.socialLinks.twitter && (
                        <Link href={author.attributes.socialLinks.twitter} className="text-white hover:text-red-500">
                          <MessagesSquare size={20} />
                        </Link>
                      )}
                      {author.attributes.socialLinks.youtube && (
                        <Link href={author.attributes.socialLinks.youtube} className="text-white hover:text-red-500">
                          <Video size={20} />
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                {/* Newsletter Subscription */}
                <Newsletter />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <SocialMediaLinks />
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
