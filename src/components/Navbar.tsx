import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-50">
      <div className="flex flex-col md:flex-row">
        {/* All Navigation Links including Logo */}
        <div className="flex flex-1 w-full">
          {/* Logo as first item */}
          <Link href="/" className="bg-black text-white flex items-center justify-center py-2 md:py-3 px-3 md:w-auto md:flex-1">
            <div className="relative h-10 md:h-12 w-auto">
              <Image
                src="/logo.png"
                alt="Framagz Logo"
                width={160}
                height={48}
                priority
                className="object-contain h-full w-auto"
              />
            </div>
          </Link>

          <NavLink
            href="/news"
            label="ALL NEWS"
            bgColor="bg-[#6B46C1]"
            flexGrow={true}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />
          <NavLink
            href="/categories"
            label="CATEGORIES"
            bgColor="bg-[#B7386F]"
            flexGrow={true}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            }
          />
          <NavLink
            href="/about"
            label="ABOUT US"
            bgColor="bg-[#00AAC1]"
            flexGrow={true}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <NavLink
            href="/career"
            label="CAREER"
            bgColor="bg-[#FF6038]"
            flexGrow={true}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
          <NavLink
            href="/contact"
            label="CONTACT"
            bgColor="bg-[#7D8B3E]"
            flexGrow={true}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
          <NavLink
            href="/search"
            label="SEARCH"
            bgColor="bg-green-800"
            flexGrow={true}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </nav>
  );
};

// NavLink component for consistent styling
interface NavLinkProps {
  href: string;
  label: string;
  bgColor?: string;
  icon?: React.ReactNode;
  flexGrow?: boolean;
}

const NavLink = ({ href, label, bgColor = "bg-blue-900", icon, flexGrow = false }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`${bgColor} hover:brightness-110 transition-all px-2 sm:px-3 md:px-6 py-2 md:py-4 flex items-center justify-center text-white text-xs sm:text-xs font-medium font-inter ${flexGrow ? 'flex-1' : ''}`}
    >
      {/* On mobile (< 769px): Show only icon */}
      {/* On desktop (≥ 769px): Show only text (except for search which keeps icon) */}
      {icon ? (
        <>
          {/* Mobile: Show icon only */}
          <span className="block md:hidden">{icon}</span>

          {/* Desktop: For search, show icon+text; for others, hide icon */}
          <span className="hidden md:flex md:items-center md:gap-1">
            {href === '/search' && <span>{icon}</span>}
            <span>{label}</span>
          </span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </Link>
  );
};

export default Navbar;
