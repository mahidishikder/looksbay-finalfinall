import Link from "next/link";

const portfolioDemos = [
  {
    name: "Perfectionist",
    tagline: "Ultra-clean portfolio layout for high-end creatives.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Perfectionist Squarespace website template demo",
    demoUrl: "https://perfectionist-template.squarespace.com",
  },
  {
    name: "Launchday",
    tagline: "Bold conversion-focused template for digital products.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Launchday Squarespace website template demo",
    demoUrl: "https://launchday-template.squarespace.com",
  },
  {
    name: "Stories",
    tagline: "Editorial storytelling experience for modern brands.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Stories Squarespace website template demo",
    demoUrl: "https://stories-template.squarespace.com",
  },
  {
    name: "Good Vibes",
    tagline: "Vibrant and aesthetic design for lifestyle businesses.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Good Vibes Squarespace website template demo",
    demoUrl: "https://goodvibes-template.squarespace.com",
  },
  {
    name: "Social Motion",
    tagline: "Dynamic storytelling layout crafted for creative studios.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Social Motion Squarespace website template demo",
    demoUrl: "https://socialmotion-template.squarespace.com",
  },
  {
    name: "Aura Studio",
    tagline: "Minimalist luxury template for agencies and designers.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Aura Studio Squarespace website template demo",
    demoUrl: "https://aurastudio-template.squarespace.com",
  },
];

export function SquarespaceTemplatesSection() {
  return (
    <section className="relative w-full bg-[#F5F5F7] py-16 md:py-24">
      
      {/* Top Header */}
      <div className="site-container mb-12 text-center">
        <h2 className="mb-3 text-[38px] font-extrabold tracking-tight text-[#1D1D1F] sm:text-[48px] md:text-[56px] leading-[1.08]">
          Squarespace Templates
        </h2>
      </div>

      {/* 3-Column Grid Layout */}
      <div className="site-container grid grid-cols-3 gap-6 tablet:grid-cols-2 mobile:grid-cols-1">
        {portfolioDemos.map((demo) => (
          <article
            key={demo.name}
            className="group relative flex flex-col items-center justify-between overflow-hidden rounded-[16px] bg-white pb-8 text-center shadow-sm transition-all duration-300 hover:shadow-md border border-black/[0.04]"
          >
            {/* 1. TOP: Equal Padding Image Showcase (Top, Left, Right all equal p-6) */}
            <div className="w-full p-6 pb-4 mobile:p-4">
              <div className="overflow-hidden rounded-[10px]">
                <img
                  className="h-full w-full object-cover object-top rounded-[10px]"
                  src={demo.image}
                  alt={demo.alt}
                  loading="lazy"
                />
              </div>
            </div>

            {/* 2. BOTTOM: Only Name – Squarespace 7.1 Fluid Engine, Price Strikethrough, and Action Buttons */}
            <div className="z-10 flex flex-col items-center px-4">
              <span className="text-[15px] sm:text-[16px] text-[#1D1D1F] font-normal leading-normal">
                {demo.name} – Squarespace 7.1 Fluid Engine
              </span>
              <div className="mt-1 mb-4 flex items-center justify-center gap-2">
                <span className="text-base font-bold text-[#1D1D1F]">$180.00</span>
                <span className="text-sm text-[#8E8E93] line-through">$225.00</span>
              </div>

              {/* Apple Pill Style Buttons */}
              <div className="flex items-center justify-center gap-2.5">
                <a
                  href={demo.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#0077ED] px-5 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#0062C4]"
                >
                  View Demo
                </a>
                <Link
                  href={`/templates/${demo.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center justify-center rounded-full bg-[#0077ED] px-5 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#0062C4]"
                >
                  View Details
                </Link>
              </div>
            </div>

          </article>
        ))}
      </div>

    </section>
  );
}

export function FeaturedProjectSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#E8F0FE] py-16 md:py-20 mobile:py-12">
      <div className="site-container grid min-h-[580px] grid-cols-[0.88fr_1.12fr] items-center gap-12 tablet:min-h-0 tablet:grid-cols-1 tablet:gap-10 mobile:grid-cols-1 mobile:gap-8">
        <div className="relative z-10 max-w-[560px]">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#0077ED]">
            Featured Custom Web Design Project
          </p>
          <h2 className="gradient-heading mb-5 mt-0 text-[clamp(34px,3.8vw,54px)] font-bold leading-[1.08] tracking-[-.035em]">
            A digital home for a brand with a story to tell.
          </h2>
          <p className="mb-8 mt-0 max-w-[500px] text-[17px] leading-[1.7] text-[#515154]">
            Thoughtful design, clear messaging, and a Squarespace experience built around what makes this business different.
          </p>
          <Link
            href="/portfolio"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0077ED] px-8 text-[14px] font-bold tracking-[0.06em] text-white transition-colors hover:bg-[#0062C4] shadow-md shadow-blue-500/20"
          >
            VIEW THE PROJECT
          </Link>
        </div>

        <Link
          href="/portfolio"
          className="relative z-10 flex items-center justify-center tablet:min-h-[400px] mobile:min-h-0"
          aria-label="View featured web design project"
        >
          <img
            className="block h-auto max-h-[580px] w-full max-w-[800px] object-contain drop-shadow-[0_28px_44px_rgba(0,0,0,0.18)] tablet:max-h-[460px] mobile:max-h-none"
            src="https://images.squarespace-cdn.com/content/v1/5fac4b921ca05f08cb315e40/aca0393c-c69a-4de3-b6c1-be097ee06ef8/Squarespace+Web+Designer%2C+Squarespace+Designer%2C+Squarespace+Website+Designer%2C+Freelance+Squarespace+Web+Designer%2C+Website+Designer+Squarespace%2C+Web+Designer+Squarespace%2C+Best+Squarespace+Designers%2C+Web+Design+Squarespace%2C+Website+Design+Squarespace?format=1500w"
            alt="Squarespace website design displayed on desktop and tablet screens"
            loading="lazy"
          />
        </Link>
      </div>
    </section>
  );
}