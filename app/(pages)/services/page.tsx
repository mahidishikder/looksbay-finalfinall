import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, DollarSign, Sparkles } from "lucide-react";
import { servicesDetailData } from "@/app/shared/data/services-detail";
import { NewsletterCTA, PageIntro } from "@/app/shared/components/site-components";

export const metadata: Metadata = {
  title: "Services — Looksbay Studio | Bespoke Squarespace Design & SEO",
  description:
    "Explore Looksbay Studio's specialized Squarespace services: Bespoke Web Design, Technical SEO, Lightning Speed, Dedicated Support, and Template Setup.",
};

export default function ServicesPage() {
  return (
    <div className="w-full bg-[#fbfbfd]">
      {/* Page Intro Header */}
      <PageIntro
        eyebrow="Squarespace Circle Platinum Services"
        gradientTitle="Thoughtful Squarespace Services"
        secondaryTitle="Engineered for Modern Brands"
        description="We create bespoke websites, supercharge Google rankings, and optimize speed for ambitious founders, creators, and creative agencies."
      />

      {/* Services Grid Section */}
      <section className="py-16 tablet:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesDetailData.map((service) => (
              <div
                key={service.slug}
                className="group relative flex flex-col justify-between rounded-[24px] border border-black/[0.08] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0077ED]/40 hover:shadow-[0_20px_50px_rgba(0,119,237,0.12)]"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-[#0077ED]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0077ED]">
                      {service.category}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] font-semibold text-[#86868B]">
                      <Clock size={13} />
                      {service.timeline}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h2 className="text-[24px] font-bold tracking-tight text-[#1D1D1F] group-hover:text-[#0077ED] transition-colors">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#6E6E73]">
                    {service.tagline}
                  </p>

                  {/* Pricing Pill */}
                  <div className="mt-6 flex items-center gap-2 border-t border-black/[0.06] pt-4">
                    <span className="text-[12px] uppercase font-semibold text-[#86868B]">Starting at</span>
                    <strong className="text-[18px] font-extrabold text-[#1D1D1F]">{service.price}</strong>
                  </div>

                  {/* Feature Highlights */}
                  <ul className="mt-4 space-y-2 border-t border-black/[0.06] pt-4">
                    {service.featuresIncluded.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[13px] text-[#424245]">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#0077ED]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Link Action */}
                <div className="mt-8 pt-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/[0.1] bg-[#F5F5F7] px-6 py-3 text-[14px] font-bold text-[#1D1D1F] transition-all duration-200 group-hover:border-[#0077ED] group-hover:bg-[#0077ED] group-hover:text-white"
                  >
                    <span>View Service Details</span>
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="border-y border-black/[0.06] bg-white py-12">
        <div className="site-container">
          <div className="grid grid-cols-2 tablet:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-[28px] font-black text-[#0077ED]">Circle Platinum</p>
              <p className="text-[13px] text-[#86868B] uppercase font-semibold tracking-wider mt-1">Official Squarespace Partner</p>
            </div>
            <div>
              <p className="text-[28px] font-black text-[#1D1D1F]">90+ Score</p>
              <p className="text-[13px] text-[#86868B] uppercase font-semibold tracking-wider mt-1">Mobile PageSpeed Guarantee</p>
            </div>
            <div>
              <p className="text-[28px] font-black text-[#1D1D1F]">2–4 Weeks</p>
              <p className="text-[13px] text-[#86868B] uppercase font-semibold tracking-wider mt-1">Average Project Launch</p>
            </div>
            <div>
              <p className="text-[28px] font-black text-[#0077ED]">100%</p>
              <p className="text-[13px] text-[#86868B] uppercase font-semibold tracking-wider mt-1">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </div>
  );
}
