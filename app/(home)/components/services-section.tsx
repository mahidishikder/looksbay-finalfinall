import Link from "next/link";
import { ArrowRight } from "lucide-react";

const servicesData = [
  {
    cardTitle: "Custom Web Design + SEO",
    description: "A custom Squarespace website designed around your unique brand identity, services, and core business goals. Includes technical SEO optimization for search engines, fully mobile-responsive layouts, and video guidance for easy management.",
    href: "/services/custom-web-design",
    image: "/images/service-custom-design.png",
  },
  {
    cardTitle: "Squarespace Templates",
    description: "Premium Squarespace templates crafted for entrepreneurs, creatives, and small businesses who want a highly polished website without starting from scratch. Fully customizable with step-by-step setup guides to launch quickly.",
    href: "/templates",
    image: "/images/service-templates.png",
  },
  {
    cardTitle: "Squarespace SEO + AI Search",
    description: "Already have a Squarespace site? Boost your organic visibility with comprehensive technical SEO and modern AI search optimization. We ensure search engines fully understand your business and connect you with qualified clients.",
    href: "/services/seo",
    image: "/images/service-seo.png",
  },
];

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F5F7] px-6 py-[100px] mobile:px-[18px] mobile:py-[60px]">
      {/* Background Soft Glow behind Header */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(39,97,235,0.06)_0%,rgba(0,0,0,0)_70%)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1480px]">
        {/* Section Header with Gradient Title */}
        <div className="mb-14 text-center">
          <p className="mb-2 text-[13px] font-semibold tracking-[0.25em] text-[#2761EB] uppercase">
            MADE FOR YOUR NEXT CHAPTER
          </p>
          <h2 className="mb-0 text-[36px] font-extrabold tracking-tight text-[#1D1D1F] sm:text-[42px] md:text-[48px] leading-[1.08] mobile:text-[28px]">
            Squarespace Website Services
          </h2>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-3 gap-8 tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-6">
          {servicesData.map((service) => {
            return (
              <article 
                key={service.cardTitle}
                className="group flex flex-col justify-between overflow-hidden rounded-[10px] border border-black/[0.08] bg-white transition-all duration-300 hover:border-[#2761EB]/30 hover:shadow-[0_12px_28px_rgba(39,97,235,0.08)]"
              >
                <div>
                  {/* Top Image Container */}
                  <div className="relative flex h-[320px] w-full items-center justify-center bg-[#F5F5F7] px-6 py-6 transition-colors duration-300 group-hover:bg-[#EBECEE] mobile:h-[250px]">
                    <img 
                      src={service.image} 
                      alt={service.cardTitle}
                      className="h-full w-full object-contain pointer-events-none select-none"
                    />
                  </div>

                  {/* Card Content Header & Body */}
                  <div className="px-8 pt-7 pb-2 text-center mobile:px-6">
                    <h3 className="mb-3 text-[22px] font-bold tracking-tight text-[#1D1D1F]">
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
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full border border-[#2761EB]/30 bg-[#2761EB]/5 px-8 py-3.5 text-[14px] font-bold uppercase tracking-[0.05em] text-[#2761EB] backdrop-blur-md transition-all duration-300 hover:border-[#2761EB] hover:bg-[#2761EB] hover:text-white hover:shadow-[0_8px_20px_rgba(39,97,235,0.25)]"
                  >
                    <span>VIEW SERVICE</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
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