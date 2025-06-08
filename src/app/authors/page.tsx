import React from 'react';
import TodaysUpdate from '@/components/TodaysUpdate';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';
import Link from 'next/link';
import SocialMediaLinks from '@/components/SocialMediaLinks';

export const metadata: Metadata = {
  title: 'Authors - Framagz',
  description: 'Meet the talented authors and editors behind Framagz content.',
  keywords: 'authors, writers, editors, journalists, content creators, framagz team',
};

async function getAuthors() {
  const res = await fetch('http://localhost:1337/api/authors');
  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}

export default async function AuthorsPage() {
  const authors = await getAuthors();
  const todaysUpdateText = "THE AUTHORS";
  const bgColor = "#000000";
  return (
    <>
      <TodaysUpdate text={todaysUpdateText} bgColor={bgColor} />
      <section className="bg-black text-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Authors */}
            <div className="w-full lg:w-2/3 pt-12 px-4">
              <div className="md:pl-6">
                <div className="space-y-12">
                  {authors.length === 0 && <div>No authors found.</div>}
                  {authors.map((author: any, index: number) => (
                    <div
                      key={author.id}
                      className={`flex flex-col md:flex-row gap-6 pb-12 ${index < authors.length - 1 ? 'border-b border-gray-700' : ''}`}
                    >
                      {/* Author Image */}
                      <Link href={`/authors/${author.id}`} className="w-full md:w-1/3">
                        <div className="relative aspect-square w-full">
                          <Image
                            src={author.attributes?.imageUrl || 'https://picsum.photos/300/300'}
                            alt={author.attributes?.name || 'Author'}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      </Link>
                      {/* Author Info */}
                      <div className="w-full md:w-2/3 flex flex-col justify-center">
                        <Link href={`/authors/${author.id}`}>
                          <h2 className="text-3xl font-bold mb-1 hover:text-red-500 transition-colors">{author.attributes?.name}</h2>
                        </Link>
                        <p className="text-red-500 font-semibold mb-4">{author.attributes?.role}</p>
                        <p className="text-white">{author.attributes?.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right Column - Newsletter Only */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-15 bg-[#181818]">
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
