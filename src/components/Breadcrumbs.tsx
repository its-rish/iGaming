"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BreadcrumbPath {
  name: string;
  href: string;
}

export interface IBreadcrumbsProps {
  bgColor?: string;
  paths: BreadcrumbPath[];
}

function Breadcrumbs({ ...props }: IBreadcrumbsProps) {


  return (
    <div style={{ backgroundColor: `${props.bgColor}` }}>
      <nav className="lg:py-15 md:py-11 py-7 lg:px-5 md:px-4 px-2.5" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center justify-center gap-2 ">
          {props.paths.map((path, index) => (
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={index}
              className="flex items-center leading-6 "
            >
              {index !== 0 && (
                <i className="mr-2">
                  <ChevronRight className="w-12 h-12 text-gray-400 " />
                </i>
              )}
              {index === props.paths.length - 1 ? (
              
                  <span className="lg:text-5xl md:text-4xl text-3xl inline-block font-normal text-white capitalize font-anton">
                    {path.name}
                  </span>
              ) : (
                <Link
                  href={path.href}
                  className="hover:text-[#89847A] inline-block lg:text-5xl md:text-4xl text-3xl font-anton capitalize text-white font-normal transition-colors duration-200"
                >
                  {path.name}
                </Link>
              )}
            </motion.li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumbs;
