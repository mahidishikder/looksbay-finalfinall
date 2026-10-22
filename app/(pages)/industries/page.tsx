import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Building2, Briefcase } from "lucide-react";
import { industriesData } from "@/app/shared/data/industries-data";
import { PageIntro, NewsletterCTA } from "@/app/shared/components/site-components";

export const metadata: Metadata = {
  title: "Squarespace Website Solutions by Industry | Looksbay Studio",
  description:
    "Tailored Squarespace 7.1 websites for law firms, real estate, healthcare clinics, interior designers, restaurants, therapists, accountants, and luxury brands.",
  keywords: [
    "squarespace website for law firms",
    "squarespace for real estate",
    "squarespace for healthcare clinics",
    "squarespace for fitness trainers",
    "squarespace for interior designers",
    "squarespace for restaurants",
    "squarespace for therapists",
    "squarespace for accountants",
    "squarespace for architects",
    "squarespace for med spas and aesthetics",
  ],
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesIndexPage() {
  return (
    <div className="w-full bg-[#fbfbfd]">
      <PageIntro
        eyebrow="Industry-Specific Squarespace Solutions"
        gradientTitle="Engineered For Your Niche."
        secondaryTitle="Designed For Rapid Growth."
        description="Every industry has distinct client expectations, booking workflows, and compliance standards. Explore how Looksbay crafts custom Squarespace solutions tailored to your market."
      />

      <section className="py-16 tablet:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesData.map((ind) => (
              <div
                key={ind.slug}
                className="group flex flex-col justify-between rounded-[24px] border border-black/[0.08] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0077ED]/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-[#0077ED]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0077ED]">
                      {ind.name}
                    </span>
                    <span className="text-xs font-semibold text-[#86868B]">
                      {ind.estimatedTimeline}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F] group-hover:text-[#0077ED] transition-colors">
                    {ind.title}
                  </h2>
                  <p className="mt-3 text-sm text-[#6E6E73] leading-relaxed">
                    {ind.tagline}
                  </p>

                  <div className="mt-6 border-t border-black/[0.06] pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#86868B] mb-2">
                      Key Highlights
                    </p>
                    <ul className="space-y-1.5">
                      {ind.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#424245]">
                          <CheckCircle2 size={13} className="text-[#0077ED] shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-black/[0.06]">
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/[0.1] bg-[#F5F5F7] px-5 py-3 text-sm font-bold text-[#1D1D1F] transition-all group-hover:bg-[#0077ED] group-hover:text-white group-hover:border-[#0077ED]"
                  >
                    <span>View {ind.name} Solution</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </div>
  );
}
