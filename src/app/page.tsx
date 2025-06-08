import React from 'react'
import TodaysUpdate from '@/components/TodaysUpdate'
import HeroSlideshow from '@/components/HeroSlideshow'
import NewsSection from '@/components/NewsSection'
import Footer from '@/components/Footer'

export default function Home() {
  // This could come from an API, CMS, or other data source
  const todaysUpdateText = "TODAY'S UPDATE"

  return (
    <>
      {/* Today's Update Banner - Only on homepage */}
      <TodaysUpdate text={todaysUpdateText} />

      {/* Hero Slideshow Section */}
      <HeroSlideshow />

      {/* News Section with Happening Today and Staff Picks */}
      <NewsSection />

      {/* Footer */}
      <Footer />
    </>
  )
}