"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { projects, type Project } from "../data";

const projectBackgrounds = ["#e8f0fe", "#fdf4e7", "#f3e8ff", "#eef7f5"];

const abstractShapes = [
  // 1. Huge Pure White Heart Line
  <svg key="heart" viewBox="0 0 200 200" className="h-[360px] w-[360px] fill-none stroke-white stroke-[2.8] md:h-[420px] md:w-[420px]" strokeLinecap="round" strokeLinejoin="round">
    <path d="M100 165 C15 105 15 40 70 28 C92 23 100 42 100 42 C100 42 108 23 130 28 C185 40 185 105 100 165 Z" />
  </svg>,
  // 2. Huge Pure White Loop
  <svg key="loop" viewBox="0 0 200 200" className="h-[360px] w-[360px] fill-none stroke-white stroke-[2.8] md:h-[420px] md:w-[420px]" strokeLinecap="round">
    <path d="M 30 140 C 70 200, 170 170, 160 100 C 145 35, 75 45, 85 105 C 95 150, 175 130, 185 85" />
  </svg>,
  // 3. Huge Pure White Hand Gesture
  <svg key="rock" viewBox="0 0 200 200" className="h-[340px] w-[340px] fill-none stroke-white stroke-[2.8] md:h-[380px] md:w-[380px]" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 60 140 C 60 100, 70 80, 70 80 M 70 110 C 70 90, 85 70, 85 70 M 85 100 C 85 85, 100 65, 100 65 M 100 95 C 100 80, 115 60, 115 60 L 115 130 C 115 160, 60 160, 60 140 Z" />
  </svg>,
  // 4. Huge Pure White Wave
  <svg key="wave" viewBox="0 0 200 200" className="h-[360px] w-[360px] fill-none stroke-white stroke-[2.8] md:h-[420px] md:w-[420px]" strokeLinecap="round">
    <path d="M 10 100 Q 50 20, 100 100 T 190 100" />
  </svg>,
];

const categories = [
  "All Projects",
  "Creative",
  "E-Commerce",
  "Wellness",
  "Studio",
  "Real Estate",
];

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});

  const toggleLike = (name: string) => {
    setLikedProjects((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All Projects") return true;
    return project.industry === activeCategory;
  });

  return (
    <div className="site-container pt-10 pb-[90px]">
      
      {/* Category Filter Pills Bar — Zero layout shift Apple style */}
      <div className="mx-auto mb-12 max-w-[900px] flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-[13px] sm:text-[14px] font-semibold tracking-normal border transition-colors duration-150 ${
                isActive
                  ? "border-[#0077ED] bg-[#0077ED] text-white shadow-sm"
                  : "border-black/[0.08] bg-[#F5F5F7] text-[#333336] hover:bg-white hover:text-[#000]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects List — EXACT SAME DESIGN AS HOME PAGE */}
      <div className="relative w-full">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => {
            const isLiked = likedProjects[project.name];
            const currentHearts = project.hearts + (isLiked ? 1 : 0);
            const bgColor = projectBackgrounds[index % projectBackgrounds.length];
            const vectorShape = abstractShapes[index % abstractShapes.length];

            return (
              <article
                key={project.name}
                className="sticky mb-12 grid min-h-[640px] w-full grid-cols-[0.88fr_1.12fr] overflow-hidden rounded-[32px] border border-[#092a40]/10 tablet:grid-cols-[.9fr_1.1fr] mobile:static mobile:mb-6 mobile:min-h-0 mobile:grid-cols-1 mobile:rounded-[22px]"
                style={{
                  top: `calc(110px + ${(index % 5) * 18}px)`,
                  zIndex: index + 1,
                  backgroundColor: bgColor,
                }}
              >
                {/* Left Side: Content & Big White Vector Art */}
                <div className="relative flex flex-col justify-between overflow-hidden p-10 tablet:p-7 mobile:min-h-[360px] mobile:p-6">
                  
                  {/* Background Dot Matrix Pattern */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(9,42,64,.2) 1.2px, transparent 1.2px)",
                      backgroundSize: "22px 22px",
                    }}
                  />

                  {/* Big White Vector Line Art */}
                  <div className="pointer-events-none absolute right-[-40px] top-[18%] z-0 opacity-100 md:right-[-60px]">
                    {vectorShape}
                  </div>

                  <div className="relative z-10">
                    {/* Title */}
                    <h3 className="gradient-heading mb-3.5 mt-0 text-[clamp(30px,3.8vw,54px)] font-extrabold leading-[1.05] tracking-[-.04em] text-[#1d1d1f]">
                      {project.name}
                    </h3>

                    {/* Industry Badge */}
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#1d1d1f] backdrop-blur">
                      <span className="size-2 rounded-full bg-[#34c759]" />
                      <span>{project.kind}</span>
                      <span className="text-[#a1a8b3]">|</span>
                      <span className="text-[#6e6e73]">{project.industry}</span>
                    </div>

                    {/* Tags */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white ${
                            tagIndex === 0
                              ? "bg-[#0077ed]"
                              : tagIndex === 1
                                ? "bg-[#6554d9]"
                                : "bg-[#0c8b78]"
                          }`}
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="mb-0 max-w-[420px] text-[15px] leading-[1.7] text-[#515b69]">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Bar: Heart Counter, Explore project Pill Button & Vertical Dots */}
                  <div className="relative z-10 mt-8 flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      {/* Heart Counter */}
                      <button
                        type="button"
                        onClick={() => toggleLike(project.name)}
                        className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2.5 text-xs font-bold text-[#1d1d1f] transition hover:scale-105 active:scale-95 cursor-pointer"
                        title="Click to like project"
                      >
                        <Heart
                          size={14}
                          className={`transition-colors ${
                            isLiked
                              ? "fill-[#ff3b30] text-[#ff3b30]"
                              : "fill-[#ff3b30]/30 text-[#ff3b30]"
                          }`}
                        />
                        <span>{currentHearts}</span>
                      </button>

                      {/* Minimal Clean Pill Button */}
                      <Link
                        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-bold text-[#0077ed] transition hover:bg-[#0077ed] hover:text-white"
                        href={`/contact?project=${encodeURIComponent(project.name)}`}
                      >
                        Explore project
                      </Link>
                    </div>

                    {/* Vertical Dot Indicator */}
                    <div className="flex flex-col items-center gap-1.5" aria-label="Project Dots">
                      {filteredProjects.map((_, dotIndex) => (
                        <span
                          className={`size-1.5 rounded-full transition-all ${
                            dotIndex === index ? "scale-125 bg-[#ff3b30]" : "bg-[#c6cfdb]"
                          }`}
                          key={dotIndex}
                        />
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Side: Clean Canva Single Mockup Image */}
                <div className="relative flex h-full items-center justify-center overflow-hidden p-6 tablet:min-h-[480px] mobile:min-h-[360px]">
                  <img
                    className="h-full w-full rounded-[22px] object-cover object-center"
                    src={project.image}
                    alt={`${project.name} preview mockup`}
                    loading="lazy"
                  />
                </div>
              </article>
            );
          })
        ) : (
          <div className="py-20 text-center text-[#6e6e73]">
            <p className="text-lg">No projects found in this category.</p>
            <button
              type="button"
              onClick={() => setActiveCategory("All Projects")}
              className="mt-4 rounded-full bg-[#0077ed] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#0062c4]"
            >
              Show All Projects
            </button>
          </div>
        )}
      </div>

    </div>
  );
}