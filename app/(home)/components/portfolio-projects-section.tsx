import Link from "next/link";
import { Heart } from "lucide-react";
import { projects } from "../../(pages)/portfolio/data";

const projectBackgrounds = ["#e8f0fe", "#fdf4e7", "#f3e8ff", "#eef7f5"];

// Pure White & Large Vector Line Art
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
  </svg>
];

export function PortfolioProjectsSection() {
  return (
    <section className="bg-white py-24 mobile:py-14">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-[800px] text-center mobile:mb-8">
        <span className="text-xs font-bold uppercase tracking-[.2em] text-blue">
          Made for the people behind the business
        </span>
        <h2 className="gradient-heading mb-3 mt-3 text-[clamp(36px,5vw,58px)] font-extrabold leading-[1.08] tracking-[-.04em]">
          Selected projects
        </h2>
        <p className="mx-auto mb-0 max-w-[600px] text-base leading-7 text-muted">
          A closer look at thoughtful Squarespace websites, each designed around a different story.
        </p>
      </div>

      <div className="site-container relative">
        {projects.slice(0, 4).map((project, index) => {
          return (
            <article
              key={project.name}
              className="sticky mb-12 grid min-h-[640px] w-full grid-cols-[0.88fr_1.12fr] overflow-hidden rounded-[32px] border border-[#092a40]/10 tablet:grid-cols-[.9fr_1.1fr] mobile:static mobile:mb-6 mobile:min-h-0 mobile:grid-cols-1 mobile:rounded-[22px]"
              style={{
                top: `calc(120px + ${index * 20}px)`, // Navbar theke perfect margin (120px) ebong card-er moddhe 20px sticky gap
                zIndex: index + 1,
                backgroundColor: projectBackgrounds[index % projectBackgrounds.length],
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
                  {abstractShapes[index % abstractShapes.length]}
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

                {/* Bottom Bar: Heart Counter & Arrowless Pill Button */}
                <div className="relative z-10 mt-8 flex items-center justify-between pt-4">
                  <div className="flex items-center gap-3">
                    {/* Heart Counter */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2.5 text-xs font-bold text-[#1d1d1f]">
                      <Heart size={14} className="fill-[#ff3b30] text-[#ff3b30]" />
                      <span>{620 + index * 108}</span>
                    </div>

                    {/* Minimal Clean Pill Button */}
                    <Link
                      className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-bold text-[#0077ed] transition hover:bg-[#0077ed] hover:text-white"
                      href="/portfolio"
                    >
                      Explore project
                    </Link>
                  </div>

                  {/* Vertical Dot Indicator */}
                  <div className="flex flex-col items-center gap-1.5" aria-label="Project Dots">
                    {projects.map((_, dotIndex) => (
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
        })}
      </div>
    </section>
  );
}