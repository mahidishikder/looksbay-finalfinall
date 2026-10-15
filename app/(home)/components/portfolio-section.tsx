import Link from "next/link";
import { ArrowRight } from "lucide-react";

const portfolioDemos = [
  {
    name: "Perfectionist",
    tagline: "Ultra-clean portfolio layout for high-end creatives.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=750w",
    alt: "Perfectionist Squarespace website template demo",
  },
  {
    name: "Launchday",
    tagline: "Bold conversion-focused template for digital products.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/fd0aff35-a3ae-40de-9979-d61848e5b68f/launchday-squarespace-template.png?format=750w",
    alt: "Launchday Squarespace website template demo",
  },
  {
    name: "Stories",
    tagline: "Editorial storytelling experience for modern brands.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/20b9bad3-232d-4276-9946-2d208e02c3e0/stories-squarespace-template.png?format=750w",
    alt: "Stories Squarespace website template demo",
  },
  {
    name: "Good Vibes",
    tagline: "Vibrant and aesthetic design for lifestyle businesses.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/c856ab54-ce43-402d-ba25-383e0d7e685a/good-vibes-squarespace-template.png?format=750w",
    alt: "Good Vibes Squarespace website template demo",
  },
];

export function PortfolioSection() {
  return (
    <section className="relative w-full bg-[#FFFFFF] py-16 md:py-24">
      
      {/* Top Header */}
      <div className="mx-auto mb-12 max-w-[1480px] px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 tablet:flex-col tablet:items-start mobile:flex-col mobile:items-start">
          <div className="max-w-[720px]">
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#2761EB]">
              A Few Good Projects
            </p>
            <h2 className="mb-3 text-[34px] font-extrabold tracking-tight text-[#1D1D1F] sm:text-[40px] leading-[1.12] mobile:text-[26px]">
              Squarespace Website Designer Portfolio
            </h2>
            <p className="m-0 text-[16px] leading-[1.6] text-[#515154]">
              Thoughtful Squarespace websites for ambitious businesses looking to elevate their online presence and attract more of their people. Each website is made to feel like its owner: clear, considered, and built to grow.
            </p>
          </div>

          <Link 
            href="/portfolio" 
            className="group/btn inline-flex items-center gap-2.5 rounded-full border border-[#2761EB]/30 bg-[#2761EB]/5 px-8 py-3.5 text-[14px] font-bold tracking-[0.05em] text-[#2761EB] backdrop-blur-md transition-all duration-300 hover:border-[#2761EB] hover:bg-[#2761EB] hover:text-white hover:shadow-[0_8px_20px_rgba(39,97,235,0.25)] shrink-0"
          >
            <span>VIEW MORE WORK</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Full Width 2-Column Apple Style Grid (No Card Rounded Border Radius) */}
      <div className="grid w-full grid-cols-2 gap-3 px-3 tablet:grid-cols-1 mobile:grid-cols-1">
        {portfolioDemos.map((demo) => (
          <article
            key={demo.name}
            className="group relative flex min-h-[620px] flex-col items-center justify-between overflow-hidden rounded-none bg-[#F5F5F7] pt-12 pb-0 text-center transition-all duration-500 hover:bg-[#F0F0F2] mobile:min-h-[480px] mobile:pt-8"
          >
            {/* Top Text & Action Buttons */}
            <div className="z-10 flex flex-col items-center px-6">
              <h3 className="mb-1 text-[34px] font-extrabold tracking-tight text-[#1D1D1F] mobile:text-[26px]">
                {demo.name}
              </h3>
              <p className="mb-5 text-[15px] text-[#6E6E73] max-w-[360px]">
                {demo.tagline}
              </p>

              {/* Apple Pill Style Buttons */}
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-full bg-[#0071E3] px-6 py-2.5 text-[13px] font-medium text-white transition-all duration-300 hover:bg-[#0077ED]"
                >
                  View More
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center rounded-full border border-[#0071E3] px-6 py-2.5 text-[13px] font-medium text-[#0071E3] transition-all duration-300 hover:bg-[#0071E3] hover:text-white"
                >
                  Buy Now
                </Link>
              </div>
            </div>

            {/* Bottom Larger Website Image Mockup Showcase */}
            <div className="relative mt-8 w-full max-w-[780px] px-4 md:px-8 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              <div className="overflow-hidden rounded-t-2xl shadow-[0_25px_50px_rgba(0,0,0,0.12)] border-t border-x border-black/10 bg-white">
                <img
                  className="h-full w-full object-cover object-top"
                  src={demo.image}
                  alt={demo.alt}
                  loading="lazy"
                />
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
    <section className="relative overflow-hidden bg-[#FFFFFF] px-[max(24px,calc((100%_-_1480px)/2))] py-[100px] mobile:px-5 mobile:py-[60px]">
      <div className="grid grid-cols-2 items-center gap-12 tablet:grid-cols-1 tablet:gap-10 mobile:grid-cols-1 mobile:gap-8">
        
        {/* Left Content Column */}
        <div className="max-w-[560px]">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#2761EB]">
            Featured Custom Web Design Project
          </p>
          <h2 className="mb-4 mt-2 text-[38px] font-extrabold leading-[1.12] tracking-tight text-[#1D1D1F] sm:text-[46px] mobile:text-[30px]">
            A digital home for a brand with a story to tell.
          </h2>
          <p className="mb-8 mt-0 text-[17px] leading-[1.65] text-[#515154]">
            Thoughtful design, clear messaging, and a Squarespace experience built around what makes this business different.
          </p>
          <Link 
            href="/portfolio" 
            className="group/btn inline-flex items-center gap-2.5 rounded-full border border-[#2761EB]/30 bg-[#2761EB]/5 px-8 py-3.5 text-[14px] font-bold tracking-[0.05em] text-[#2761EB] backdrop-blur-md transition-all duration-300 hover:border-[#2761EB] hover:bg-[#2761EB] hover:text-white hover:shadow-[0_8px_20px_rgba(39,97,235,0.25)]"
          >
            <span>VIEW THE PROJECT</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>

        {/* Right Graphic Mockup Showcase */}
        <div className="relative grid min-h-[360px] w-full place-items-center tablet:min-h-[300px] mobile:min-h-[240px]">
          {/* Subtle Glow Behind Mockup */}
          <div className="pointer-events-none absolute h-[280px] w-[280px] rounded-full bg-[#2761EB]/10 blur-[90px]" />

          {/* Desktop Frame Mockup */}
          <div className="relative w-[82%] rotate-[-2deg] rounded-2xl border border-black/10 bg-[#FFFFFF] p-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:rotate-0">
            <span className="block px-2 py-3 text-[18px] font-extrabold tracking-tight text-[#1D1D1F] mobile:text-[15px]">
              GOOD THINGS<br />GROW HERE.
            </span>
            <div className="h-[180px] overflow-hidden rounded-xl bg-[#EBECEE] mobile:h-[130px]">
              <img 
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" 
                alt="Featured website project preview" 
              />
            </div>
          </div>

          {/* Mobile Frame Mockup */}
          <div className="absolute bottom-1 right-[2%] h-[160px] w-[24%] rotate-[6deg] overflow-hidden rounded-2xl border-4 border-[#1D1D1F] bg-[#FFFFFF] p-[5px] shadow-[0_20px_35px_rgba(0,0,0,0.2)] transition-transform duration-500 hover:rotate-0 mobile:h-[125px] mobile:w-[28%]">
            <img 
              className="h-full w-full rounded-xl object-cover" 
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=300&q=80" 
              alt="Featured project on a mobile phone" 
            />
          </div>
        </div>

      </div>
    </section>
  );
}