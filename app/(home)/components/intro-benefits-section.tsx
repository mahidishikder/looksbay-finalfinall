import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function IntroBenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F5F7] py-24 md:py-32">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#2761EB]/5 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        
        {/* Top Header Section */}
        <div className="mx-auto max-w-[780px] text-center">
          <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[0.2em] text-[#2761EB]">
            WEB DESIGN · SEO · SQUARESPACE
          </span>
          <h2 className="mb-5 text-[36px] font-extrabold tracking-tight text-[#1D1D1F] sm:text-[44px] md:text-[50px] leading-[1.08]">
            Custom Squarespace Web Design + SEO
          </h2>
          <p className="mx-auto mb-8 max-w-[680px] text-[18px] leading-[1.6] text-[#515154]">
            From initial concept to launch day, we craft thoughtful digital experiences that elevate your brand and drive sustainable growth. Get bespoke design, technical SEO, and dedicated support under one roof.
          </p>
          
          {/* Secondary Button Style */}
          <Link 
            href="/services" 
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#2761EB]/30 bg-[#2761EB]/5 px-8 py-3.5 text-[15px] font-semibold text-[#2761EB] backdrop-blur-md transition-all duration-300 hover:border-[#2761EB] hover:bg-[#2761EB] hover:text-white hover:shadow-[0_8px_20px_rgba(39,97,235,0.25)] hover:-translate-y-0.5"
          >
            EXPLORE OUR SERVICES 
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}