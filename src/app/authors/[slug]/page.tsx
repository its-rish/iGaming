import React from 'react';
import TodaysUpdate from '@/components/TodaysUpdate';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';
import Link from 'next/link';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import { Camera, MessageCircle, MessagesSquare, Video } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getAuthorData(slug: string) {
  try {
    const res = await fetch(
      `https://harmonious-surprise-60a0828505.strapiapp.com/api/authors?filters[slug][$eq]=${slug}&populate=*`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      console.error('Failed to fetch author:', res.status);
      return null;
    }

    const data = await res.json();

    return data.data[0] || null;
  } catch (err) {
    console.error('Error fetching author:', err);
    return null;
  }
}

async function getArticlesByAuthor(slug: string) {
  const res = await fetch(
    `https://harmonious-surprise-60a0828505.strapiapp.com/api/articles?filters[author][slug][$eq]=${slug}&populate=*`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data.data;
}


export default async function AuthorDetailPage({ params }: { params: { slug: string } }) {
 const dynamicAuthor = await getAuthorData(params.slug);
  const articles = await getArticlesByAuthor(params.slug);
 console.log(articles,'dynamicAuthor')
  if (!dynamicAuthor) {
    console.warn('Using fallback static author data.');
  }
  const authorData = dynamicAuthor ?? null;
  console.log(authorData,'authordata')
  const authorname = authorData?.name;
  const authorrole = authorData?.jobTitle ;
  const authordescription = authorData?.jobDesc ;
  const profileUrl = authorData?.profile?.url ?? '';
   const socialLinks = authorData?.socialLinks ;
  const authorProfileImage = profileUrl?.startsWith('http')
    ? profileUrl
    : profileUrl
    ? `https://capable-fellowship-a7bdacc8df.media.strapiapp.com${profileUrl}`:'';
 

 

  return (
    <>
      <TodaysUpdate text="AUTHOR PROFILE" bgColor="#000000" />

      <section className="bg-black text-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Articles Section */}
            <div className="w-full lg:w-2/3 pt-12 px-4">
              <div className="md:pl-6">
                <h2 className="text-3xl font-bold mb-6">Articles by {authorname}</h2>
                {articles.length > 0 ? (
                  articles.map((article: any,index:number) => {
                    
                    const attr = article;
             
                    const imgUrl = article.cover?.url || article.imageUrl?.url || '';
  const imageUrl = imgUrl.startsWith('http')
    ? imgUrl
    : `https://harmonious-surprise-60a0828505.media.strapiapp.com${imgUrl}`;

                    return (
                      <Link
                        key={article.id}
                        href={`/article/${article.slug}`}
                        className="block group pb-6 mb-6 border-b border-gray-700"
                      >
                        {/* Desktop layout */}
                        <div className="hidden md:flex">
                          <div className="w-1/2 relative h-64">
                            <Image src={imageUrl} alt={article?.category?.name} fill className="object-cover" />
                          </div>
                          <div className="w-1/2 pl-4 flex flex-col justify-start pt-4">
                            <span className="text-red-500 text-sm font-semibold mb-1">{article?.category?.name}</span>
                            <p className="text-xs text-gray-500 uppercase mb-2">
                              {new Date(attr.publishedAt).toLocaleDateString()}
                            </p>
                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-3">{attr.title}</h3>
                          </div>
                        </div>

                        {/* Mobile layout */}
                        <div className="md:hidden">
                          <div className="w-full relative h-64">
                            <Image src={imageUrl} alt={article?.category?.name} fill className="object-cover" />
                          </div>
                          <div className="mt-3">
                            <span className="text-red-500 text-sm font-semibold">{article?.category?.name}</span>
                            <p className="text-xs text-gray-500 uppercase mb-2">
                              {new Date(attr.publishedAt).toLocaleDateString()}
                            </p>
                            <h3 className="text-xl font-bold">{attr.title}</h3>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p>No articles found for this author.</p>
                )}
              </div>
            </div>

            {/* Author Info */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-15 bg-[#181818]">
                <div className="p-10">
                  <h3 className="text-3xl font-bold mb-6 uppercase">About Author</h3>
                  <div className="relative aspect-square w-full mb-4">
                    <Image src={authorProfileImage as string} alt={authorname} fill className="object-cover" />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{authorname}</h2>
                  <p className="text-red-500 font-semibold mb-4">{authorrole}</p>
                  <p className="mb-6">{authordescription}</p>

                  {/* Social Links */}
                  {/* <div className="flex flex-wrap gap-4">
                    {socialLinks.instagram && (
                      <Link href={socialLinks.instagram} className="text-white hover:text-red-500">
                        <Camera size={20} />
                      </Link>
                    )}
                    {socialLinks.facebook && (
                      <Link href={socialLinks.facebook} className="text-white hover:text-red-500">
                        <MessageCircle size={20} />
                      </Link>
                    )}
                    {socialLinks.twitter && (
                      <Link href={socialLinks.twitter} className="text-white hover:text-red-500">
                        <MessagesSquare size={20} />
                      </Link>
                    )}
                    {socialLinks.youtube && (
                      <Link href={socialLinks.youtube} className="text-white hover:text-red-500">
                        <Video size={20} />
                      </Link>
                    )}
                  </div> */}
                </div>
                <Newsletter />
              </div>
            </div>
          </div>
        </div>
        <SocialMediaLinks />
      </section>

      <Footer />
    </>
  );
}
