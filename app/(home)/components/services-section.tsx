import Link from "next/link";
import { ArrowRight } from "lucide-react";

const servicesData = [
  {
    cardTitle: "Custom Web Design + SEO",
    description:
      "A custom Squarespace website designed around your unique brand identity, services, and core business goals. Includes technical SEO optimization for search engines, fully mobile-responsive layouts, and video guidance for easy management.",
    href: "/services#custom-design",
    image: "/images/service-custom-design.jpg",
  },
  {
    cardTitle: "Squarespace Templates",
    description:
      "Premium Squarespace templates crafted for entrepreneurs, creatives, and small businesses who want a highly polished website without starting from scratch. Fully customizable with step-by-step setup guides to launch quickly.",
    href: "/templates",
    image: "/images/service-templates.jpg",
  },
  {
    cardTitle: "Squarespace SEO + AI Search",
    description:
      "Already have a Squarespace site? Boost your organic visibility with comprehensive technical SEO and modern AI search optimization. We ensure search engines fully understand your business and connect you with qualified clients.",
    href: "/services#seo",
    image: "/images/service-seo.jpg",
  },
];

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F5F7] py-[100px] mobile:py-[60px]" id="services">
      {/* Background Soft Glow behind Header */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(39,97,235,0.06)_0%,rgba(0,0,0,0)_70%)] blur-[120px]" />

      <div className="site-container relative z-10">
        {/* Section Header with Gradient Title */}
        <div className="mb-14 text-center mobile:mb-10">
          <p className="mb-2 text-[13px] font-semibold tracking-[0.25em] text-[#2761EB] uppercase">
            MADE FOR YOUR NEXT CHAPTER
          </p>
          <h2 className="gradient-heading mb-0 text-[36px] font-extrabold tracking-tight text-[#1D1D1F] sm:text-[42px] md:text-[48px] leading-[1.08] mobile:text-[28px]">
            Squarespace Website Services
          </h2>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-3 gap-8 tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-6">
          {servicesData.map((service) => {
            return (
              <article 
                key={service.cardTitle}
                className="group flex flex-col justify-between overflow-hidden rounded-[14px] border border-black/[0.08] bg-white transition-colors duration-200 hover:border-[#2761EB]/30"
              >
                <div>
                  {/* Top Image Container */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#e9ecef]">
                    <img 
                      src={service.image} 
                      alt={service.cardTitle}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content Header & Body */}
                  <div className="px-8 pt-7 pb-2 text-center mobile:px-6">
                    <h3 className="gradient-heading mb-3 text-[22px] font-bold tracking-tight text-[#1D1D1F]">
                      {service.cardTitle}
                    </h3>
                    <p className="m-0 text-[15px] leading-[1.65] text-[#56555d]">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Live Action Button */}
                <div className="px-8 pb-8 pt-6 text-center mobile:px-6 mobile:pb-6">
                  <Link 
                    href={service.href} 
                    className="inline-flex items-center justify-center rounded-full bg-[#0077ED] px-8 py-3.5 text-[14px] font-bold uppercase tracking-[0.05em] text-white transition-all duration-200 hover:bg-[#0062C4] hover:shadow-md"
                  >
                    <span>VIEW SERVICE</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}