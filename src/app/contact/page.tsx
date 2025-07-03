import React from 'react'
import TodaysUpdate from '@/components/TodaysUpdate'
import Footer from '@/components/Footer'
import { Phone, Mail, Building2 } from 'lucide-react'
import { Metadata } from 'next'
import SocialMediaLinks from '@/components/SocialMediaLinks'

export const metadata: Metadata = {
  title: 'Contact Us - Framagz',
  description: 'Get in touch with the Framagz team. We\'re here to help with any inquiries.',
  keywords: 'contact, get in touch, help, support, framagz contact',
};

export default function Contact() {
  // Dynamic text for the contact page with green background
  const todaysUpdateText = "GET IN TOUCH"
  const bgColor = "#7D8B3E" // Green background color

  return (
    <>
      {/* Today's Update Banner with different text for Contact page */}
      <TodaysUpdate text={todaysUpdateText} bgColor={bgColor} />

      {/* Google Map Section */}
      <div className="w-full h-[700px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5481220184!2d4.8855456!3d52.3733262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c5e9286a47%3A0x2e7b9e138927298d!2sAmsterdam%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute top-4 left-4 bg-white p-2 text-xs">
          <p>52°22'33.7"N 4°52'28.7"E</p>
          <p>Synch HQ, Amsterdam, Netherlands</p>
          <a href="https://maps.google.com/?q=52.3760,4.8750" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View larger map</a>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="text-[#9CA53B] text-3xl font-medium mb-6">Don't Be Afraid To Say Hello With Us</h2>
              <p className="text-white mb-8">
                Great! We are excited to hear from you and let's start something special together.
                Call us for any inquiry.
              </p>

              <div className="bg-[#111111] p-6 mb-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-[#FF5733]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Phone Call</h3>
                    <p className="text-white">+87 19928-9128827</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111111] p-6 mb-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-[#FF5733]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Email Address</h3>
                    <p className="text-[#FF5733]">hello@framer.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111111] p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-[#FF5733]">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Office</h3>
                    <p className="text-white">Howein South Street 18 A Nanjakan Building, South Tangerang Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <h2 className="text-[#9CA53B] text-3xl font-medium mb-6">Send Us A Message</h2>
              <p className="text-white mb-8">
                Fill up the form and our team will get back to you within 24 hours. are excited to hear
                from you and let's start something special together.
              </p>

              <form className="space-y-4 bg-[#181818] lg:p-7.5 md:p-5">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Jane Smith"
                    className="w-full p-3 bg-[#333333] text-white border-none rounded-none focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="jane@framer.com"
                    className="w-full p-3 bg-[#333333] text-white border-none rounded-none focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                  <select
                    id="subject"
                    className="w-full p-3 bg-[#333333] text-white border-none rounded-none focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
                  >
                    <option value="Editorial">Editorial</option>
                    <option value="Support">Support</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Type your message"
                    className="w-full p-3 bg-[#333333] text-white border-none rounded-none focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#FF5733] text-white font-bold uppercase tracking-wider hover:bg-[#E64A19] transition-colors"
                >
                  Submit
                </button>
              </form>
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
