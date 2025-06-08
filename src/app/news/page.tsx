import React from 'react'
import TodaysUpdate from '@/components/TodaysUpdate'
import NewsPageSection from '@/components/NewsPageSection'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News - Framagz',
  description: 'Stay updated with the latest news and events from around the world.',
  keywords: 'news, latest news, breaking news, world news, current events',
}

export default function NewsPage() {
  // Dynamic text for the news page with purple background
  const todaysUpdateText = "UPTODATE NEWS"
  const bgColor = "#6B46C1" // Purple background color

  return (
    <>
      {/* Today's Update Banner with news-specific text and background */}
      <TodaysUpdate text={todaysUpdateText} bgColor={bgColor} />

      {/* News Content Section */}
      <NewsPageSection />

      {/* Footer */}
      <Footer />
    </>
  )
}