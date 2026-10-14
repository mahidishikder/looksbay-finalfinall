import Link from "next/link";

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
    <section className="bg-[#F5F5F7] px-6 py-[100px] mobile:px-[18px] mobile:py-[60px]">
      {/* Section Header */}
      <div className="mb-14 text-center">
        <span className="inline-block text-[14px] font-bold tracking-[.14em] text-[#2761EB] uppercase">
          MADE FOR YOUR NEXT CHAPTER
        </span>
        <h2 className="mb-0 mt-2 text-[36px] font-bold tracking-tight text-[#1D1D1F] mobile:text-[28px]">
          Squarespace Website Services
        </h2>
      </div>

      {/* 3 Columns Grid */}
      <div className="mx-auto grid max-w-[1480px] grid-cols-3 gap-8 tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-6">
        {servicesData.map((service) => {
          return (
            <article 
              key={service.cardTitle}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-black/5 bg-white"
            >
              <div>
                {/* Top Image Container */}
                <div className="relative flex h-[280px] w-full items-center justify-center bg-[#EBECEE] px-6 py-6 mobile:h-[220px]">
                  <img 
                    src={service.image} 
                    alt={service.cardTitle}
                    className="h-full w-full object-contain"
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

              {/* Bottom Button Action */}
              <div className="px-8 pb-8 pt-6 text-center mobile:px-6 mobile:pb-6">
                <Link 
                  href={service.href} 
                  className="inline-flex items-center justify-center rounded-full bg-[#2761EB] px-8 py-3.5 text-[14px] font-bold uppercase tracking-[0.05em] text-white"
                >
                  VIEW SERVICE
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}