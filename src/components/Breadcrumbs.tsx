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
      <nav className="py-20 px-5" aria-label="Breadcrumb">
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
              
                  <span className="text-7xl inline-block font-normal text-white capitalize font-anton">
                    {path.name}
                  </span>
              ) : (
                <Link
                  href={path.href}
                  className="hover:text-[#89847A] inline-block text-7xl font-anton capitalize text-white font-normal transition-colors duration-200"
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
