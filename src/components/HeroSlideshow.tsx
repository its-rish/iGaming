"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Slide {
  id?: number;
  title?: string;
  category?: string;
  date?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  createdAt?: string;
  slug?:string;
}

const FALLBACK_IMAGE = 'https://via.placeholder.com/1920x1080?text=Loading+Image';
const FALLBACK_IMAGE_MOBILE = 'https://via.placeholder.com/800x1200?text=Loading+Image';

const HeroSlideshow = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Fetch featured articles
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(
          'https://harmonious-surprise-60a0828505.strapiapp.com/api/articles?populate=*&filters[Featured][$eq]=true'
        );
        const json = await res.json();
        const data = json.data || [];
       

        const mappedSlides: Slide[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item?.category?.name || 'Uncategorized',
          date: item?.date || new Date(item.createdAt).toDateString(),
          imageUrl: item.cover?.url || FALLBACK_IMAGE,
          mobileImageUrl: item.cover?.url || FALLBACK_IMAGE_MOBILE,
          createdAt: item?.createdAt,
          slug:item?.slug
        })).slice(0, 6);

        setSlides(mappedSlides);
      } catch (err) {
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setImageError(false); // reset image error state on slide change
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) {
    return(
           <div className="h-screen w-full bg-gray-900 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-700 opacity-30" />
        <div className="relative z-10 flex flex-col justify-center h-full text-white p-6 md:p-12 lg:p-16">
          <div className="mb-4 h-4 w-40 bg-gray-600 rounded" />
          <div className="mb-6 h-8 w-3/4 bg-gray-600 rounded" />
          <div className="h-8 w-1/2 bg-gray-600 rounded" />
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];
  const imageUrl = imageError
    ? isMobile ? FALLBACK_IMAGE_MOBILE : FALLBACK_IMAGE
    : isMobile ? slide.mobileImageUrl : slide.imageUrl;

  return (
    <div className="relative w-full h-[100vh] md:h-[110vh] overflow-hidden">
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
              src={imageUrl as string}
              alt={slide.title as string}
              fill
              sizes="100vw"
              priority
              className="object-cover"
              quality={90}
              onError={() => setImageError(true)}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col justify-center h-full text-white p-4 sm:p-6 md:p-12 lg:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + '-content'}
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

            <Link href={slide.slug as string} className="text-4xl hover:text-[#e2e2e2] sm:text-3xl md:text-5xl lg:text-7xl  leading-tight  mb-4 md:mb-8 max-w-4xl font-anton">
              {slide.title}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSlideshow;
