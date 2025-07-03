'use client';

import React from 'react';
import TodaysUpdate from '@/components/TodaysUpdate';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';
import Link from 'next/link';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import { Camera, MessageCircle, MessagesSquare, Video } from 'lucide-react';

const author = {
  name: 'Elissa Medina',
  role: 'News Editor',
  description:
    "I'm Elissa, your go-to wordsmith on a mission to turn ideas into impactful narratives. As a seasoned freelance copywriter, I specialize in transforming visions into compelling stories that resonate with audiences.",
  imageUrl: 'https://picsum.photos/300/300',
  socialLinks: {
    instagram: 'https://instagram.com/elissa',
    facebook: 'https://facebook.com/elissa',
    twitter: 'https://twitter.com/elissa',
    youtube: 'https://youtube.com/@elissa',
  },
};

const articles = [
  {
    id: 1,
    title: 'Breaking News: Market Sees Unprecedented Growth',
    category: 'Business',
    date: '2025-06-20',
    imageUrl: 'https://picsum.photos/800/400?random=1',
    link: '/article/1',
  },
  {
    id: 2,
    title: 'Exploring the Future of AI in Journalism',
    category: 'Technology',
    date: '2025-06-10',
    imageUrl: 'https://picsum.photos/800/400?random=2',
    link: '/article/2',
  },
];

export default function AuthorDetailPage() {
  return (
    <>
      <TodaysUpdate text="AUTHOR PROFILE" bgColor="#000000" />

      <section className="bg-black text-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Author's Articles */}
            <div className="w-full lg:w-2/3 pt-12 px-4">
              <div className="md:pl-6">
                <h2 className="text-3xl font-bold mb-6">
                  Articles by {author.name}
                </h2>
                <div>
                  {articles.length > 0 ? (
                    articles.map((article) => (
                      <Link
                        key={article.id}
                        href={article.link}
                        className="block group pb-6 mb-6 border-b border-gray-700"
                      >
                        {/* Desktop layout */}
                        <div className="hidden md:flex">
                          <div className="w-1/2 relative h-64">
                            <Image
                              src={article.imageUrl}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="w-1/2 pl-4 flex flex-col justify-start pt-4">
                            <span className="text-red-500 text-sm font-semibold mb-1">
                              {article.category}
                            </span>
                            <p className="text-xs text-gray-500 uppercase mb-2">
                              {new Date(article.date).toLocaleDateString()}
                            </p>
                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-3">
                              {article.title}
                            </h3>
                          </div>
                        </div>

                        {/* Mobile layout */}
                        <div className="md:hidden">
                          <div className="w-full relative h-64">
                            <Image
                              src={article.imageUrl}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="mt-3">
                            <span className="text-red-500 text-sm font-semibold">
                              {article.category}
                            </span>
                            <p className="text-xs text-gray-500 uppercase mb-2">
                              {new Date(article.date).toLocaleDateString()}
                            </p>
                            <h3 className="text-xl font-bold">{article.title}</h3>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p>No articles found for this author.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Author Info */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-15 bg-[#181818]">
                <div className="p-10">
                  <h3 className="text-3xl font-bold mb-6 uppercase">About Author</h3>
                  <div className="relative aspect-square w-full mb-4">
                    <Image
                      src={author.imageUrl}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{author.name}</h2>
                  <p className="text-red-500 font-semibold mb-4">{author.role}</p>
                  <p className="mb-6">{author.description}</p>

                  {/* Social Links */}
                  <div className="flex flex-wrap gap-4">
                    {author.socialLinks.instagram && (
                      <Link
                        href={author.socialLinks.instagram}
                        className="text-white hover:text-red-500"
                      >
                        <Camera size={20} />
                      </Link>
                    )}
                    {author.socialLinks.facebook && (
                      <Link
                        href={author.socialLinks.facebook}
                        className="text-white hover:text-red-500"
                      >
                        <MessageCircle size={20} />
                      </Link>
                    )}
                    {author.socialLinks.twitter && (
                      <Link
                        href={author.socialLinks.twitter}
                        className="text-white hover:text-red-500"
                      >
                        <MessagesSquare size={20} />
                      </Link>
                    )}
                    {author.socialLinks.youtube && (
                      <Link
                        href={author.socialLinks.youtube}
                        className="text-white hover:text-red-500"
                      >
                        <Video size={20} />
                      </Link>
                    )}
                  </div>
                </div>
                <Newsletter />
              </div>
            </div>
          </div>
        </div>
        <SocialMediaLinks />
      </section>

      <Footer />
    </>
  );
}
