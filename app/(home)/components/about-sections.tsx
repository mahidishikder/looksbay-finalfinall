import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function AgencySection() {
  return (
    <section className="bg-white py-[90px] mobile:py-[55px]" id="team">
      <div className="site-container grid grid-cols-[1.05fr_0.95fr] items-center gap-12 tablet:grid-cols-1 tablet:gap-10 mobile:grid-cols-1 mobile:gap-8">
        
        {/* Left Column: Team Image with 750+ Trust Stat Badge */}
        <div className="relative overflow-hidden rounded-[20px] border border-black/10 bg-[#0A0A0C] shadow-[0_20px_45px_rgba(0,0,0,0.14)]">
          <div className="relative aspect-[16/11] w-full min-h-[380px] tablet:min-h-[340px] mobile:min-h-[260px]">
            <img
              src="/images/looksbay-team.jpg"
              alt="Looksbay Dedicated Squarespace Expert Team"
              className="h-full w-full object-cover object-center select-none"
              loading="lazy"
            />
            {/* 750+ Projects Completed Badge */}
            <div className="absolute bottom-5 left-5 rounded-[12px] bg-black/85 px-4 py-2.5 backdrop-blur-md border border-white/10 shadow-lg mobile:bottom-3 mobile:left-3 mobile:px-3 mobile:py-2">
              <span className="block text-2xl font-extrabold text-[#2997FF] leading-none mobile:text-lg">750+</span>
              <span className="text-[11px] font-medium text-white/80 uppercase tracking-wider mobile:text-[9px]">Projects Completed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Content with Circle Partner Logo on Top */}
        <div className="flex flex-col justify-center">
          {/* Squarespace Circle Member Image - Enlarged & Prominent */}
          <div className="mb-5">
            <img
              src="/images/squarespace-circle-member.png"
              alt="Squarespace Circle Member"
              className="h-14 tablet:h-16 desktop:h-16 w-auto object-contain select-none mobile:h-11"
            />
          </div>

          {/* Compact, Refined Title */}
          <h2 className="gradient-heading mb-3 text-[clamp(26px,2.8vw,34px)] font-bold leading-[1.18] tracking-[-0.025em]">
            Built by Specialists. Powered by Deep Squarespace Mastery.
          </h2>

          {/* Clean, Engaging Paragraphs */}
          <p className="mb-3 text-[15px] leading-[1.7] text-[#2c2d30]">
            At Looksbay, you don’t get a lone freelancer or an outsourced team. You get a fully dedicated in-house team of certified Squarespace designers, front-end developers, and technical SEO specialists collaborating closely on your website.
          </p>
          <p className="mb-5 text-[14px] leading-[1.65] text-muted">
            From bespoke custom CSS architecture to conversion-focused layouts, we bring collective studio experience to make sure your website looks world-class, ranks high on Google, and works hard for your business.
          </p>

          {/* Clean, Card-Free Value Highlights */}
          <ul className="mb-6 grid list-none gap-3 border-y border-line/80 py-4 pl-0">
            <li className="flex items-start gap-2.5 text-sm text-[#2c2d30]">
              <div className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#eef5ff] text-[#0077ED]">
                <Check size={12} strokeWidth={2.5} />
              </div>
              <span className="leading-[1.5]">
                <strong className="font-semibold text-ink">Circle Partner Perks: </strong>
                <span className="text-muted">Extended 6-month trial timelines and an exclusive 20% discount on Squarespace annual plans.</span>
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-[#2c2d30]">
              <div className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#eef5ff] text-[#0077ED]">
                <Check size={12} strokeWidth={2.5} />
              </div>
              <span className="leading-[1.5]">
                <strong className="font-semibold text-ink">Custom Code &amp; Fluid Engine: </strong>
                <span className="text-muted">Bespoke CSS styling, tailored animations, and responsive layouts beyond standard template limits.</span>
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-[#2c2d30]">
              <div className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#eef5ff] text-[#0077ED]">
                <Check size={12} strokeWidth={2.5} />
              </div>
              <span className="leading-[1.5]">
                <strong className="font-semibold text-ink">Comprehensive Handover: </strong>
                <span className="text-muted">Built-in technical SEO optimization, personalized video training, and reliable launch support.</span>
              </span>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0077ED] px-7 text-[14px] font-bold text-white transition hover:bg-[#0062C4] shadow-md shadow-blue-500/20"
            >
              Talk with our team
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-6 text-[14px] font-semibold text-ink transition hover:bg-paper"
            >
              <span>View our projects</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
