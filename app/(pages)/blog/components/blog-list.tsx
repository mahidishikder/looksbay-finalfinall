"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { blogPosts } from "@/app/shared/data/blog-posts";

export default function BlogList() {
  const featuredPost = blogPosts[0];
  const latestPosts = blogPosts.slice(1, 5);

  const resolveImage = (img: string) => {
    if (img.startsWith("/") || img.startsWith("http")) return img;
    return `https://images.unsplash.com/${img}?auto=format&fit=crop&w=1200&q=85`;
  };

  return (
    <div className="w-full">
      {/* 1. Header & Featured Article Showcase */}
      <div className="site-container pt-12 desktop:pt-16 pb-14 mobile:pt-8 mobile:pb-10">
        {/* Page Title */}
        <h1 className="font-serif text-[clamp(38px,4.5vw,56px)] font-normal tracking-tight text-[#1D1D1F] mb-10 sm:mb-12">
          Our Blog
        </h1>

        {/* Featured Article Showcase (Dual-Column Layout with Balanced Content) */}
        {featuredPost && (
          <section className="grid grid-cols-1 desktop:grid-cols-2 items-stretch gap-10 desktop:gap-14">
            {/* Left Side: Rich Looksbay Article Information */}
            <div className="flex flex-col justify-between text-left py-1">
              <div>
                {/* Meta Pill & Date */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-[#71717A] mb-4">
                  <span className="inline-flex items-center rounded-full bg-[#0077ED]/10 px-3 py-1 text-xs font-semibold text-[#0077ED] tracking-wide">
                    {featuredPost.category}
                  </span>
                  <span className="text-[#D1D1D6]">•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#71717A]" strokeWidth={1.7} />
                    <span>{featuredPost.date}</span>
                  </div>
                  <span className="text-[#D1D1D6]">•</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-[clamp(28px,3.2vw,42px)] font-normal leading-[1.22] text-[#1D1D1F] mb-4">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="hover:text-[#0077ED] transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>

                {/* Substantial Excerpt */}
                <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#555558] mb-6">
                  {featuredPost.excerpt}
                </p>

                {/* Key Highlights Covered in Guide */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 pb-5 mb-6 border-t border-b border-black/[0.08]">
                  <div className="flex items-center gap-2 text-[13px] text-[#3A3A3C]">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0077ED]/10 text-[10px] font-bold text-[#0077ED]">✓</span>
                    <span>Title tags &amp; meta description setup</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#3A3A3C]">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0077ED]/10 text-[10px] font-bold text-[#0077ED]">✓</span>
                    <span>Semantic H1–H3 heading architecture</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#3A3A3C]">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0077ED]/10 text-[10px] font-bold text-[#0077ED]">✓</span>
                    <span>Core Web Vitals &amp; image compression</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#3A3A3C]">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0077ED]/10 text-[10px] font-bold text-[#0077ED]">✓</span>
                    <span>Google Search Console indexing roadmap</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Read More + Author */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center justify-center rounded-lg border border-black/25 bg-transparent px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#1D1D1F] transition-all hover:bg-black hover:text-white"
                >
                  Read More
                </Link>

                <div className="flex items-center gap-2.5 text-xs text-[#71717A]">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="h-7 w-7 rounded-full object-cover border border-black/10"
                  />
                  <div>
                    <p className="font-semibold text-[#1D1D1F] leading-none mb-0.5">{featuredPost.author.name}</p>
                    <p className="text-[11px] text-[#86868B] leading-none">{featuredPost.author.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Looksbay Featured Article Image matching height with subtle rounded corners */}
            <div className="relative aspect-[4/3] desktop:aspect-auto desktop:h-full min-h-[380px] w-full overflow-hidden rounded-[16px] bg-[#f5f5f7] shadow-sm">
              <Link href={`/blog/${featuredPost.slug}`} className="block h-full w-full">
                <img
                  src={resolveImage(featuredPost.image)}
                  alt={featuredPost.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </Link>
            </div>
          </section>
        )}
      </div>

      {/* 2. Full-Width Latest Posts Section (Background #F5F5F7 spanning 100% width with 4 cards and reduced border-radius) */}
      {latestPosts.length > 0 && (
        <section className="w-full bg-[#F5F5F7] py-16 sm:py-20">
          <div className="site-container">
            <h2 className="font-serif text-[28px] sm:text-[34px] font-normal text-[#1D1D1F] mb-8 sm:mb-10">
              Latest Posts
            </h2>

            <div className="grid grid-cols-4 gap-6 desktop:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1">
              {latestPosts.map((post) => (
                <article key={post.slug} className="group flex flex-col">
                  {/* Image with subtle border radius (reduced from rounded-2xl to rounded-[8px]) */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block overflow-hidden rounded-[8px] aspect-[16/11] bg-white mb-3.5 shadow-sm"
                  >
                    <img
                      src={resolveImage(post.image)}
                      alt={post.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <h3 className="text-[15px] sm:text-[16px] font-semibold leading-snug text-[#1D1D1F] mb-2 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#0077ED] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <div className="mt-auto flex items-center gap-1.5 text-xs text-[#86868B]">
                    <Clock size={13} className="text-[#86868B]" strokeWidth={1.7} />
                    <span>{post.date}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
