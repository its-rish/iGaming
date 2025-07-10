"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TodaysUpdateProps {
  text?: string;
  bgColor?: string;
}

const TodaysUpdate: React.FC<TodaysUpdateProps> = ({
  text = "Today's Update",
  bgColor = "#000000" // Default black background
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full text-white relative" style={{ backgroundColor: bgColor }}>
      {/* Content */}
      <div className="px-2 sm:px-4 py-2 relative z-10">
        {mounted && (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-[11vw] md:text-[12vw] lg:text-[16vw] font-normal leading-[1.1] text-center uppercase font-anton"
            style={{ width: '100%', overflowWrap: 'break-word' }}
          >
            {text}
          </motion.h1>
        )}
      </div>
    </div>
  );
};

export default TodaysUpdate;
