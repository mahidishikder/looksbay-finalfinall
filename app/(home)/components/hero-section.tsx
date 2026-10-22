"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

// Images list
const heroImages = [
  "https://images.squarespace-cdn.com/content/v1/5fac4b921ca05f08cb315e40/55ed030e-4255-4db5-9297-312d094c6da4/Squarespace+Web+Designer+%2B+Freelance+Squarespace+Web+Designer+%2B+Squarespace+Web+Design+Packages+%2B+Squarespace+Designer+%2B+Best+Squarespace+Designers+%2B+Squarespace+Website+Designer+%2B+Hire+Squarespace+Designer+%2B+Best+Squarespace+Web+Designers+%2B+Custom+Squarespace+Website+%2B+Squarespace+for+Designers+%2B+Website+Designer+Squarespace%2C+Web+Designer+Squarespace%2C+Squarespace+Web+Developer%2C+squarespace+site+designer?format=750w",
  "https://images.squarespace-cdn.com/content/v1/5fac4b921ca05f08cb315e40/f881d89f-f1ab-4cd7-b89d-bc0cc49a9f21/Squarespace+Web+Designer+%2B+Freelance+Squarespace+Web+Designer+%2B+Squarespace+Web+Design+Packages+%2B+Squarespace+Designer+%2B+Best+Squarespace+Designers+%2B+Squarespace+Website+Designer+%2B+Hire+Squarespace+Designer+%2B+Best+Squarespace+Web+Designers+%2B+Custom+Squarespace+Website?format=750w",
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Smooth Crossfade Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden bg-[linear-gradient(110deg,#f5f5f7_0_58%,#fff_58%_100%)]">
      <div className="site-container grid min-h-[570px] grid-cols-[0.95fr_1.05fr] items-center gap-[clamp(40px,5vw,70px)] py-[70px] tablet:min-h-0 tablet:grid-cols-1 tablet:gap-9 mobile:grid-cols-1 mobile:gap-9 mobile:py-11">
        
        {/* Left Side (Fixed Text) */}
        <div className="relative z-[1] max-w-[640px] tablet:max-w-[680px]">
          <span className="inline-block text-[15px] font-bold tracking-[.12em] text-[#2761EB] mobile:text-[10px]">
            SQUARESPACE WEB DESIGN · SEO EXPERT
          </span>

          {/* Title with Apple Gradient */}
          <h1 className="my-[18px] max-w-[620px] text-[clamp(42px,4vw,62px)] font-extrabold leading-[1.02] tracking-[-0.05em] text-[#1D1D1F] mobile:text-[40px]">
            Your Entire <br />
            <span className="bg-[linear-gradient(90deg,#2997FF_0%,#A855F7_28%,#EC4899_55%,#FF3B30_78%,#FF9500_100%)] bg-clip-text text-transparent">
              Squarespace Journey.
            </span>
            <br />
            Under One Roof.
          </h1>

          <p className="my-0 max-w-[440px] text-lg leading-[1.55] text-[#56555d]">
            From custom design and front-end coding to advanced SEO and ready-to-launch templates—we handle everything Squarespace.
          </p>

          <ul className="my-5 mb-7 grid list-none gap-2.5 p-0">
            <li className="flex items-center gap-2.5 text-base leading-[1.5] text-[#4d4d54]">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2761EB]" />
              <span>Thoughtful custom website design</span>
            </li>
            <li className="flex items-center gap-2.5 text-base leading-[1.5] text-[#4d4d54]">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2761EB]" />
              <span>Technical SEO and performance</span>
            </li>
            <li className="flex items-center gap-2.5 text-base leading-[1.5] text-[#4d4d54]">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2761EB]" />
              <span>Templates ready for your business</span>
            </li>
          </ul>

          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-full bg-[#0077ED] px-8 py-4 text-[16px] font-bold tracking-[.02em] text-white transition-colors"
          >
            GET STARTED 
          </Link>
        </div>
        
        {/* Right Side: Clean Apple-Style Smooth Fade Transition */}
        <div className="relative mx-auto flex h-[460px] w-full items-center justify-center tablet:h-[360px] mobile:h-[260px]">
          {heroImages.map((imgUrl, index) => {
            const isActive = index === currentImageIndex;
            return (
              <img 
                key={index}
                src={imgUrl}
                alt={`Squarespace design preview ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-contain bg-transparent border-0 outline-none ring-0 shadow-none transition-opacity duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isActive 
                    ? "opacity-100 z-10" 
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}