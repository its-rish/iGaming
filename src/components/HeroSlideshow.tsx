"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Sample slide data - this would be replaced with API data later
const slideData = [
  {
    id: 1,
    imageUrl: 'https://picsum.photos/id/1025/1920/1080',
    mobileImageUrl: 'https://picsum.photos/id/1025/800/1200',
    date: 'TUESDAY, DECEMBER 3, 2024',
    category: 'SHOWBIZ',
    title: 'AWARD-WINNING DIRECTOR TEASES NEW SCI-FI BLOCKBUSTER FOR 2025',
  },
  {
    id: 2,
    imageUrl: 'https://picsum.photos/id/1033/1920/1080',
    mobileImageUrl: 'https://picsum.photos/id/1033/800/1200',
    date: 'MONDAY, DECEMBER 2, 2024',
    category: 'TECH',
    title: 'REVOLUTIONARY AI SYSTEM TRANSFORMS FILM PRODUCTION INDUSTRY',
  },
  {
    id: 3,
    imageUrl: 'https://picsum.photos/id/1039/1920/1080',
    mobileImageUrl: 'https://picsum.photos/id/1039/800/1200',
    date: 'SUNDAY, DECEMBER 1, 2024',
    category: 'ENTERTAINMENT',
    title: 'GLOBAL BOX OFFICE RECORDS SHATTERED BY INDIE FILM PHENOMENON',
  },
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle automatic slide transition
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(slideInterval);
  }, []);

  const slide = slideData[currentSlide];
  const imageUrl = isMobile ? slide.mobileImageUrl : slide.imageUrl;

  return (
    <div className="relative w-full h-[100vh] md:h-[110vh] overflow-hidden">
      {/* Background Image with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 6, ease: "linear" }}
          >
            <Image
              src={imageUrl}
              alt={slide.title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
              quality={90}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center md:justify-center h-full text-white p-4 sm:p-6 md:p-12 lg:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:mb-0"
          >
            <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
              <span className="text-xs md:text-sm lg:text-base font-medium">{slide.date}</span>
              <span className="text-xs md:text-sm lg:text-base font-medium">|</span>
              <span className="text-xs md:text-sm lg:text-base font-medium">{slide.category}</span>
            </div>

            <h2 className="text-4xl hover:text-[#e2e2e2] sm:text-3xl md:text-5xl lg:text-7xl  leading-tight  mb-4 md:mb-8 max-w-4xl font-anton">
              {slide.title}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSlideshow;
