"use client";

import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export interface TechnologyPost {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  link: string;
}

interface TechnologySectionProps {
  posts?: TechnologyPost[];
}

export default function SliderCard({ ...props }) {
  return (
    <Swiper
      slidesPerView={3.5}
      spaceBetween={15}
      freeMode
      loop
      breakpoints={{
        300: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        
        599: {
          slidesPerView: 1.5,
        },
        899: {
          slidesPerView: 2.5,
        },
        1199: {
          slidesPerView: 3.5,
        },
      }}
      modules={[Pagination, Autoplay,FreeMode]}
      className="mySwiper"
    >
      {props.posts.map((post:TechnologyPost, index:number) => (
        <SwiperSlide>
          <div
            key={post.id}
           
          >
            <Link href={`/article/${post.id}`}>
              <div className="relative w-full h-48">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-2">
                <p className="text-gray-400 text-xs md:text-xs uppercase mb-1 md:mb-2 font-inter">
                  {post.date}
                </p>
                <h3 className="text-white text-lg md:text-xl font-anton">
                  {post.title}
                </h3>
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
