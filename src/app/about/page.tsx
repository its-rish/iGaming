import React from 'react';
import TodaysUpdate from '@/components/TodaysUpdate';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SocialMediaLinks from '@/components/SocialMediaLinks';

export const metadata: Metadata = {
    title: 'News - Framagz',
    description: 'Stay updated with the latest news and events from around the world.',
    keywords: 'news, latest news, breaking news, world news, current events',
};
export default function About() {
  // Dynamic text for the about page with black background
  const todaysUpdateText = "ABOUT FRAMAGZ"
  const bgColor = "#00AAC1" // Black background color

  return (
    <>
      {/* Today's Update Banner with different text for About page */}
      <TodaysUpdate text={todaysUpdateText} bgColor={bgColor} />

      <div>
        <Image
          src="https://capable-fellowship-a7bdacc8df.media.strapiapp.com/about_Banner_48f95b241b.jpg"
          alt="About Banner"
          width={1200}
          height={400}
          className="w-full h-auto"
        />
      </div>

      {/* About Company and Vision Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* About Our Company */}
            <div className="px-4">
              <h2 className="text-[#9CA53B] text-3xl font-medium mb-6">About Our Company</h2>
              <p className="text-2xl md:text-4xl font-bold leading-tight">
                Framagz is a cutting-edge Framer template designed for digital news platforms, blogs, and online magazines. Built for speed, aesthetics, and ease of use, Framagz empowers content creators to launch professional websites effortlessly.
              </p>
            </div>

            {/* Our Vision and Mission */}
            <div className="px-4">
              <h2 className="text-[#9CA53B] text-3xl font-medium mb-6">Our Vision</h2>
              <p className="text-2xl mb-10">
                To revolutionize digital news experiences with a sleek, fast, and user-friendly Framer template that enhances content delivery.
              </p>

              <h2 className="text-[#9CA53B] text-3xl font-medium mb-6">Our Mission</h2>
              <p className="text-2xl">
                Framagz is committed to providing a high-performance and customizable Framer template that simplifies website creation. We integrate the latest design trends to ensure a seamless user experience, enabling content creators to focus on delivering impactful stories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gray Border */}
      <div className="bg-black">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <div className="border-b border-gray-800"></div>
        </div>
      </div>

      {/* Why Choose Framagz Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <h2 className="text-[#9CA53B] text-3xl font-medium mb-10 px-4">Why Choose Framagz?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Modern & Responsive Design */}
            <div className="bg-[#111111] p-6 rounded-sm flex">
              <div className="mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Modern & Responsive Design</h3>
                <p className="text-gray-400 text-sm">
                  We are happy to advise you on the basis of a project or as part of a permanent arrangement.
                </p>
              </div>
            </div>

            {/* Easy Customization */}
            <div className="bg-[#111111] p-6 rounded-sm flex">
              <div className="mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M16 12l-4 4-4-4"></path>
                  <path d="M12 8v8"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Easy Customization</h3>
                <p className="text-gray-400 text-sm">
                  We are happy to advise you on the basis of a project or as part of a permanent arrangement.
                </p>
              </div>
            </div>

            {/* High Performance */}
            <div className="bg-[#111111] p-6 rounded-sm flex">
              <div className="mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">High Performance</h3>
                <p className="text-gray-400 text-sm">
                  We are happy to advise you on the basis of a project or as part of a permanent arrangement.
                </p>
              </div>
            </div>

            {/* Regular Updates */}
            <div className="bg-[#111111] p-6 rounded-sm flex">
              <div className="mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Regular Updates</h3>
                <p className="text-gray-400 text-sm">
                  We are happy to advise you on the basis of a project or as part of a permanent arrangement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gray Border */}
      <div className="bg-black">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <div className="border-b border-gray-800"></div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="bg-black text-white pt-16">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex justify-between items-center mb-10 px-4">
            <h2 className="text-[#9CA53B] text-3xl font-medium">Our Team</h2>
            <Link href="/authors" className="text-red-500 text-sm uppercase hover:underline">
              VIEW ALL AUTHORS
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Team Member 1 */}
            <div className="relative">
              <div className="relative h-[350px] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Juliana"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  style={{ backgroundColor: "#FFCC99" }}
                />
              </div>
              <div className="text-center py-4">
                <h3 className="text-white text-xl font-semibold">Juliana</h3>
                <p className="text-gray-400 text-sm uppercase tracking-wider">NEWS EDITOR</p>
              </div>
            </div>

          
          </div>
        </div>
      </div>

      <SocialMediaLinks />

      {/* Footer */}
      <Footer />
    </>
  )
}
