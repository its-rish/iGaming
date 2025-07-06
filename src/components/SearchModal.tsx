"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { CircleX, Cross, CrossIcon, SearchIcon } from 'lucide-react';

interface Category {
  id: number;
  title: string;
  slug: string;
}

function SearchModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
  const overlayVariants = {
    visible: {
      opacity: 1,
      
      transition: {
        when: "beforeChildren",
        duration: 0.3,
        delayChildren: 0.4
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.3,
        delay: 0.4
      }
    }
  };

  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
const [debouncedQuery, setDebouncedQuery] = useState('');
  // Fetch categories from Strapi
 useEffect(() => {
  const fetchCategories = async () => {
    const res = await fetch(
      'https://harmonious-surprise-60a0828505.strapiapp.com/api/articles?populate=*'
    );
    const data = await res.json();
    setCategories(data.data.map((cat: any) => ({
      id: cat.id,
      title: cat.title,
      slug: cat.slug,
    })));
  };

  if (modalIsOpen && categories.length === 0) {
    fetchCategories();
  }
}, [modalIsOpen]);
// Debounce query change
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(query);
  }, 300); 

  return () => clearTimeout(timer); 
}, [query]);



const filtered = categories.filter((cat) =>
  cat.title.toLowerCase().includes(debouncedQuery.toLowerCase())
);


  return (
    <>
    
      <button onClick={()=>{
            setModalIsOpen(true)
           }} className="bg-green-800 hover:brightness-110 cursor-pointer transition-all px-2 sm:px-3 md:px-6 py-2 md:py-4 flex items-center justify-center text-white text-xs sm:text-xs font-medium font-inter flex-1">
            <span className=" inline-flex items-center ">
              <i className=" inline-block md:hidden leading-0 mr-0 md:mr-1.5 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </i>
           <span className=" hidden md:inline-block ">
               SEARCH
           </span>
            </span>
          </button>
    
  <AnimatePresence >
        {modalIsOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className="modal-overlay fixed top-0 left-0 w-full h-full z-[99999] bg-[#000000cc]"
            onClick={()=>{
                setModalIsOpen(false);
                setQuery("")
            }}
          >
            <motion.div
              className="modal lg:max-w-[540px] w-full px-5 md:max-w-[calc(100%-100px)] max-w-full m-auto h-full flex items-center justify-center max-h-[calc(100%-80px)] overflow-auto"
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ duration: 0.4 }}
            >
              <div className='modal-body w-full' onClick={(e)=>{
               e.stopPropagation()
            }}>
            <div className='rounded-2xl bg-white overflow-hidden w-full'>
                <div className='relative w-full'>
                     <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-0 px-12 text-black py-5  font-medium md:text-2xl text-base  focus:outline-none placeholder:text-gray-600"
              autoFocus
            />
          <i className=' leading-0 absolute top-1/2 left-3 h-6 w-6 text-gray-600 -translate-y-1/2'>
              <SearchIcon color='currentcolor'  width="100%" height="100%"/>
          </i>
            <button onClick={()=>{setQuery("")}} className=' flex items-center justify-center p-0 leading-0 absolute top-1/2 right-3 h-5 w-5 text-gray-900 -translate-y-1/2'>
              <CircleX color='currentcolor' width="100%" height="100%"/>
          </button>
            </div>

            {/* Results */}
         
            {query && (
              <ul className="bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto">
                {filtered.length > 0 ? (
                  filtered.map((cat) => (
                    <li key={cat.id} className="px-4 py-2 hover:bg-gray-100">
                      <Link
                        href={`/article/${cat.slug}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            setModalIsOpen(false)
                        }}
                        className="block text-gray-800 py-2"
                      >
                        {cat.title}
                        
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No results found.</li>
                )}
              </ul>
            )}
            </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SearchModal