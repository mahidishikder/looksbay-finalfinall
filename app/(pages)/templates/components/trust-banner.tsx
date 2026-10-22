export default function TrustBanner() {
  return (
    <section className="w-full border-y border-black/[0.08] bg-[#F7F7F8] py-10 tablet:py-12 desktop:py-14">
      <div className="site-container flex flex-wrap items-center justify-center gap-10 tablet:gap-12 desktop:justify-between">
        
        {/* 1. Left: Studio Headline */}
        <div className="flex items-center">
          <span className="text-[18px] desktop:text-[20px] font-semibold tracking-tight text-[#111111]">
            Top-rated Squarespace studio
          </span>
        </div>

        {/* 2. Middle-Left: Official Circle Platinum Partner Badge (Enlarged) */}
        <div className="flex items-center">
          <img
            src="/images/squarespace-platinum-partner-2026.png"
            alt="Squarespace Circle Platinum Partner 2026"
            className="h-16 tablet:h-20 desktop:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* 3. Middle-Right: Marketplace Expert Badge (Enlarged) */}
        <div className="flex items-center gap-4 shrink-0 transition-transform duration-300 hover:scale-105">
          <div className="relative flex h-[72px] w-[72px] desktop:h-[84px] desktop:w-[84px] shrink-0 items-center justify-center text-[#627760]">
            <svg
              viewBox="0 0 56 56"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d="M 43 14 A 22 22 0 1 0 43 42"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="round"
              />
            </svg>
            <svg
              viewBox="0 0 40 40"
              className="relative z-10 h-8 w-8 desktop:h-9 desktop:w-9 fill-current pr-0.5"
              aria-label="Squarespace Logo"
            >
              <path d="M30.7 15.6l-5.4-5.4c-2.3-2.3-6.1-2.3-8.5 0l-5.5 5.5c-2.3 2.3-2.3 6.1 0 8.5l5.4 5.4c2.3 2.3 6.1 2.3 8.5 0l5.5-5.5c2.3-2.3 2.3-6.1 0-8.5zm-3 5.5l-5.5 5.5c-.7.7-1.8.7-2.5 0l-5.4-5.4c-.7-.7-.7-1.8 0-2.5l5.5-5.5c.7-.7 1.8-.7 2.5 0l5.4 5.4c.7.7.7 1.8 0 2.5z" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[18px] desktop:text-[20px] font-bold tracking-tight text-[#111111] leading-tight">
              Marketplace Expert
            </span>
            <span className="text-[11px] desktop:text-[12px] font-bold uppercase tracking-[0.16em] text-[#71717A] mt-1">
              SQUARESPACE 2025
            </span>
          </div>
        </div>

        {/* 4. Right: Client Count */}
        <div className="flex items-center">
          <span className="text-[18px] desktop:text-[20px] font-semibold tracking-tight text-[#111111]">
            2,000+ happy clients
          </span>
        </div>

      </div>
    </section>
  );
}
