"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background pattern - subtle curved lines */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="curved-lines" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
              <path d="M0,200 C100,50 200,350 300,200 S500,50 600,200" fill="none" stroke="white" strokeWidth="2" />
              <path d="M-200,200 C-100,50 0,350 100,200 S300,50 400,200" fill="none" stroke="white" strokeWidth="2" />
              <path d="M0,100 C100,-50 200,250 300,100 S500,-50 600,100" fill="none" stroke="white" strokeWidth="2" />
              <path d="M-200,100 C-100,-50 0,250 100,100 S300,-50 400,100" fill="none" stroke="white" strokeWidth="2" />
              <path d="M0,300 C100,150 200,450 300,300 S500,150 600,300" fill="none" stroke="white" strokeWidth="2" />
              <path d="M-200,300 C-100,150 0,450 100,300 S300,150 400,300" fill="none" stroke="white" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#curved-lines)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-8 md:px-16 py-8 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-8 md:mb-16">
          {/* About Section - Left Side */}
          <div className="md:col-span-3">
            <div className="mb-4">
              <figure
               
                className="object-contain mb-4 leading-0 h-20"
            >
              <Logo/>
            </figure>
            </div>
            <p className="text-white text-md font-inter">
              Framagz is a cutting-edge Framer template designed for digital news platforms, blogs, and online magazines.
            </p>
          </div>

          {/* Empty space in the middle */}
          <div className="hidden md:block md:col-span-3"></div>

          {/* News Categories - Middle Right */}
          <div className="md:col-span-3">
            <h3 className="text-2xl font-bold mb-4 mt-6 md:mt-0 font-inter">News Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/technology" className="text-white hover:text-gray-300 transition-colors text-md font-inter">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-white hover:text-gray-300 transition-colors text-md font-inter">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/sport" className="text-white hover:text-gray-300 transition-colors text-md font-inter">
                  Sport
                </Link>
              </li>
              <li>
                <Link href="/showbiz" className="text-white hover:text-gray-300 transition-colors text-md font-inter">
                  Showbiz
                </Link>
              </li>
              <li>
                <Link href="/lifestyle" className="text-white hover:text-gray-300 transition-colors text-md font-inter">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - Far Right */}
          <div className="md:col-span-3">
            <h3 className="text-2xl font-bold mb-4 mt-6 md:mt-0 font-inter">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/news" className="text-white hover:text-gray-300 transition-colors text-md font-inter">
                  News
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-gray-300 transition-colors text-md font-inter">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-white hover:text-gray-300 transition-colors text-md font-inter">
                  The Authors
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-white hover:text-gray-300 transition-colors text-md font-inter">
                  Career
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-gray-300 transition-colors text-md font-inter">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center px-2">
          <p className="text-white max-w-8xl mx-auto mb-4 sm:mb-6 leading-relaxed text-xs font-inter">
            Uncover the pulse of the world with Framagz, your premier destination for up-to-the-minute news coverage. Delve into a diverse array of topics, ranging from local happenings to global affairs, politics, technology, entertainment, and beyond. At Framagz, we deliver reliable, comprehensive, and insightful articles that empower you to stay informed and engaged with the issues shaping our world.
          </p>
          <p className="text-white max-w-8xl mx-auto leading-relaxed text-xs font-inter">
            Experience a fresh perspective on breaking stories, thought-provoking analyses, and in-depth features, all curated with a commitment to accuracy and relevance. Navigate the ever-evolving news landscape effortlessly with Framagz, your trusted source for timely and meaningful information. Join us on a journey of discovery as we bring you the news that matters most, delivering a dynamic and enriching news-reading experience.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 sm:mt-12 text-center text-white text-xs sm:text-sm tracking-wide">
          <p className="font-inter">2024 © FRAMAGZ - FRAMER TEMPLATE. DESIGN BY HOLYKIT.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
