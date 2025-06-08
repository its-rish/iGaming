import TodaysUpdate from '@/components/TodaysUpdate'
import React from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import SocialMediaLinks from '@/components/SocialMediaLinks'

const career = () => {
  const todaysUpdateText = "LET'S JOIN US"
  const bgColor = "#FF6038" // Black background color

  return (
    <>
      <TodaysUpdate
        text={todaysUpdateText} bgColor={bgColor} />

      <div>
        <Image
          src="https://framerusercontent.com/images/2yOyHgSFXxalpvLcLJ8KuPRnwHw.jpg?scale-down-to=2048"
          alt="About Banner"
          width={1200}
          height={400}
          className="w-full h-auto"
        />
      </div>

      {/* Our Profile Section */}
      <div className="bg-black text-white py-10">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <h2 className="text-[#9CA53B] text-3xl font-medium mb-6">Our Profile</h2>

          <p className="text-white text-2xl md:text-3xl lg:text-4xl font-light mb-8">
            Framagz is a cutting-edge Framer template designed for digital
            news platforms, blogs, and online magazines. Built for speed,
            aesthetics, and ease of use, Framagz empowers content creators
            to launch professional websites effortlessly.
          </p>

          <div className="border-b border-gray-800 mt-8"></div>
        </div>
      </div>

      {/* Why Choose Framagz Section */}
      <div className="bg-black text-white pb-10">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <h2 className="text-[#9CA53B] text-3xl font-medium mb-10 px-4">Perks And Benefits</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Modern & Responsive Design */}
            <div className="bg-[#111111] py-8 px-10 rounded-sm flex">
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
            <div className="bg-[#111111] py-8 px-10 rounded-sm flex">
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
            <div className="bg-[#111111] py-8 px-10 rounded-sm flex">
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
            <div className="bg-[#111111] py-8 px-10 rounded-sm flex">
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
            {/* Regular Updates */}
            <div className="bg-[#111111] py-8 px-10 rounded-sm flex">
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
            {/* Regular Updates */}
            <div className="bg-[#111111] py-8 px-10 rounded-sm flex">
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

      {/* Testimonial Section */}
      <div className="bg-black text-white py-10">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column - Image */}
            <div className="relative h-[400px] md:h-[700px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Mark Thompson"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Right Column - Testimonial */}
            <div className="flex flex-col h-full justify-between">
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed">
                Working at Framagz has been an inspiring journey. The team's
                passion for innovation and user experience makes every project
                exciting. It's rewarding to see our templates help media brands
                thrive!
              </p>

              <div className="mt-auto pt-8">
                <h3 className="text-[#9CA53B] text-xl font-medium">Mark Thompson</h3>
                <p className="text-gray-400">Sr. Copywriter</p>
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

export default career