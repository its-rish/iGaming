import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import TodaysUpdate from "@/components/TodaysUpdate";
import TopContributors from "@/components/TopContributors";
import Image from "next/image";
import React from "react";
import dumyImage from "../../../../public/assets/dumy1.webp";
import SliderCard from "@/components/SliderCard";

function index() {
  const bgColor = "#323476";

  const navroute = [
    { name: "categories", href: "https://framerz.vercel.app/categories" },
    { name: "category-details", href: "/categories/category-details" },
  ];
  const sliderCard=[
{
  id: 1,
  title: 'Breakthrough AI Model Promises to Revolutionize Healthcare',
  date: 'DECEMBER 7, 2024',
  imageUrl: dumyImage,
  link: '/',
},
{
  id: 1,
  title: 'Breakthrough AI Model Promises to Revolutionize Healthcare',
  date: 'DECEMBER 7, 2024',
  imageUrl: dumyImage,
  link: '/',
},
{
  id: 1,
  title: 'Breakthrough AI Model Promises to Revolutionize Healthcare',
  date: 'DECEMBER 7, 2024',
  imageUrl: dumyImage,
  link: '/',
},
{
  id: 1,
  title: 'Breakthrough AI Model Promises to Revolutionize Healthcare',
  date: 'DECEMBER 7, 2024',
  imageUrl: dumyImage,
  link: '/',
},
{
  id: 1,
  title: 'Breakthrough AI Model Promises to Revolutionize Healthcare',
  date: 'DECEMBER 7, 2024',
  imageUrl: dumyImage,
  link: '/',
},
{
  id: 1,
  title: 'Breakthrough AI Model Promises to Revolutionize Healthcare',
  date: 'DECEMBER 7, 2024',
  imageUrl: dumyImage,
  link: '/',
},{
  id: 1,
  title: 'Breakthrough AI Model Promises to Revolutionize Healthcare',
  date: 'DECEMBER 7, 2024',
  imageUrl: dumyImage,
  link: '/',
}
  ] 


  return (
    <>
      <Breadcrumbs paths={navroute} bgColor={bgColor} />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Category Posts */}
          <div className="w-full lg:w-2/3 pt-12 px-4">
            <div className="md:pl-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6  text-white">
                How AI is Transforming Our Daily Lives
              </h2>
              <figure className="relative p-0 pb-[60%]">
                <Image
                  src={dumyImage}
                  alt="dumyImage"
                  width={700}
                  height={400}
                  className=" absolute top-0 left-0 w-full h-full object-cover"
                />
              </figure>
              {/* category details */}
              <div className="pt-2">
                <p className="text-right mb-4 font-inter text-sm font-normal text-[#99a1af]">
                  SEPTEMBER 9, 2024
                </p>

                <p className="  mb-3  text-white">
                  AI is deeply embedded in the smartphones we use every day.
                  Face recognition technology, used to unlock devices, relies
                  heavily on AI algorithms. Voice assistants like Siri, Google
                  Assistant, and Alexa enable users to perform tasks hands-free,
                  from setting reminders to searching the web. Auto-correction
                  and predictive text in messaging apps are powered by AI,
                  helping users communicate more efficiently. Camera apps use AI
                  to enhance photo quality and suggest the best angles and
                  filters. AI also powers real-time language translation and
                  accessibility features for visually or hearing-impaired users.
                </p>
                <p className="  mb-3 text-white">
                  Workplaces are evolving with AI. From automated emails to
                  intelligent scheduling tools, productivity is being enhanced.
                  AI is also used in recruitment to screen resumes, assess
                  candidate fit, and conduct initial interviews. While AI is
                  automating many repetitive tasks, it also opens up new job
                  roles in AI development, data science, ethics, and human-AI
                  collaboration. It is transforming industries and reshaping the
                  future workforce.
                </p>
                <p className="  mb-3 text-white">
                  Education is becoming more personalized thanks to AI.
                  Platforms like Khan Academy, Coursera, and Duolingo use AI to
                  tailor learning experiences based on student performance and
                  pace. Virtual tutors provide instant support and guidance. AI
                  can analyze student data to identify gaps in understanding,
                  recommend revision material, and predict academic outcomes.
                  Schools are also using AI to automate administrative tasks,
                  allowing teachers to focus more on instruction.
                </p>
              </div>
              {/* slider sction for the post */}
              <div>
                  <SliderCard posts={sliderCard}/>
              </div>
            </div>
          </div>
          {/* Right Column - Staff Picks & Contributors */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-15 bg-[#181818]">
              {/* Staff Picks */}
              <div className="p-10 sm:px-10">
                <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 uppercase">
                  Staff Picks
                </h3>
                {/* You can fetch staff picks from Strapi if needed */}
                <div className="space-y-4">
                  {/* ...existing code for staff picks... */}
                </div>
              </div>
              <TopContributors />
              <Newsletter />
            </div>
          </div>
        </div>
      </div>
      <SocialMediaLinks />
      <Footer />
    </>
  );
}

export default index;
