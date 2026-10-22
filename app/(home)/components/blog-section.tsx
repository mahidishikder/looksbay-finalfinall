import Link from "next/link";
import { Clock } from "lucide-react";
import { blogPosts } from "@/app/shared/data/blog-posts";

export function BlogSection() {
  // Exactly 3 clean featured editorial posts as requested
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="bg-[#E8F0FE] py-20 desktop:py-28" id="blog">
      <div className="site-container">
        
        {/* Section Header — Styled consistently with other sections */}
        <div className="mb-14 text-center mobile:mb-10">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-[#0077ED]">
            Notes From The Studio
          </p>
          <h2 className="gradient-heading mb-3 text-[36px] font-extrabold tracking-tight text-[#1D1D1F] sm:text-[46px] md:text-[52px] leading-[1.08]">
            Latest Guides &amp; Insights
          </h2>
          <p className="mx-auto max-w-[580px] text-[16px] leading-[1.65] text-[#515154]">
            Proven strategies, technical breakdowns, and actionable guides to help you build, rank, and grow your Squarespace website.
          </p>
        </div>

        {/* 3 Clean Editorial Cards Grid */}
        <div className="grid grid-cols-3 gap-8 tablet:grid-cols-2 mobile:grid-cols-1">
          {latestPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group flex flex-col text-left transition-all duration-300"
            >
              {/* Image Frame with Reduced Border Radius (rounded-[8px]) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[8px] bg-white/60 shadow-sm">
                <img
                  src={`https://images.unsplash.com/${post.image}?auto=format&fit=crop&w=800&q=85`}
                  alt={post.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h3 className="mt-3.5 text-[17px] sm:text-[18px] font-bold leading-[1.35] text-[#1D1D1F] transition-colors duration-200 group-hover:text-[#0077ED] line-clamp-2">
                {post.title}
              </h3>

              {/* Date with Clock Icon */}
              <div className="mt-2 flex items-center gap-1.5 text-xs text-[#515154] font-medium">
                <Clock size={13} className="shrink-0 text-[#0077ED]" />
                <span>{post.date}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
