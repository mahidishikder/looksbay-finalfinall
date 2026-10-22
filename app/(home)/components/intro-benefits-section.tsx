import Link from "next/link";
import { Layout, Search, Zap, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Layout,
    title: "Bespoke Web Design",
    description: "Custom Squarespace layouts crafted to highlight your brand identity without clunky templates."
  },
  {
    icon: Search,
    title: "Technical SEO Built-In",
    description: "Built-in search engine optimization from day one, ensuring higher Google rankings & organic growth."
  },
  {
    icon: Zap,
    title: "Lightning Speed",
    description: "Optimized asset loading and zero layout shift for a smooth, Apple-like user experience."
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Support",
    description: "From domain setup to post-launch maintenance—we handle everything under one roof."
  }
];

export function IntroBenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-[#fff] py-24 md:py-32">
      {/* SVG Gradient Definition for Lucide Icons */}
      <svg width="0" height="0" className="absolute opacity-0 pointer-events-none">
        <defs>
          <linearGradient id="appleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2997FF" />
            <stop offset="35%" stopColor="#A855F7" />
            <stop offset="70%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#FF9500" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(39,97,235,0.06)_0%,rgba(0,0,0,0)_70%)] blur-[140px]" />

      <div className="site-container relative z-10">
        
        {/* Header Section */}
        <div className="mx-auto max-w-[800px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.25em] text-[#2761EB]">
            Web Design · SEO · Squarespace
          </p>
          <h2 className="gradient-heading mb-6 text-[36px] font-extrabold tracking-tight text-[#1D1D1F] sm:text-[44px] md:text-[52px] leading-[1.08]">
            Custom Squarespace Web Design + SEO
          </h2>
          <p className="mx-auto mb-14 max-w-[680px] text-[18px] leading-[1.6] text-[#515154]">
            From initial concept to launch day, we craft thoughtful digital experiences that elevate your brand and drive sustainable growth. Get bespoke design, technical SEO, and dedicated support under one roof.
          </p>
        </div>

        {/* 4 Larger Cards Side-by-Side */}
        <div 
          className="mt-8 grid w-full gap-7"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={idx}
                className="group relative flex min-h-[290px] w-full flex-col justify-between rounded-[10px] border border-black/[0.08] bg-[#F5F5F7] p-9 transition-all duration-300 hover:border-[#2761EB]/40 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
              >
                <div>
                  {/* Live Gradient Icon Box */}
                  <div className="relative mb-7 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] bg-white p-3.5 shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-black/[0.04]">
                    
                    {/* Continuous Breathing/Pulse Glow */}
                    <span className="absolute inset-0 -z-10 animate-pulse rounded-2xl bg-[radial-gradient(circle,#2997FF_0%,#EC4899_50%,transparent_100%)] opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-50" />

                    {/* Gradient Icon */}
                    <Icon 
                      className="h-7 w-7 transition-transform duration-300 ease-out group-hover:rotate-6 group-hover:scale-110" 
                      style={{ stroke: "url(#appleGradient)" }}
                    />
                  </div>
                  
                  <h3 className="gradient-heading mb-3 text-[20px] font-bold tracking-tight text-[#1D1D1F]">
                    {benefit.title}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-[#6E6E73]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Button */}
        <div className="mt-16 text-center">
          <Link 
            href="/services" 
            className="inline-flex items-center justify-center rounded-full bg-[#0077ED] px-9 py-4 text-[15px] font-semibold text-white transition-colors"
          >
            EXPLORE OUR SERVICES 
          </Link>
        </div>

      </div>
    </section>
  );
}