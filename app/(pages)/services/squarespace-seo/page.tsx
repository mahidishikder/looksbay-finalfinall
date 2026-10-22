import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Gauge,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Zap,
  Globe,
  Database,
  SlidersHorizontal,
} from "lucide-react";
import { NewsletterCTA } from "@/app/shared/components/site-components";

export const metadata: Metadata = {
  title: "Squarespace SEO Expert & Core Web Vitals Optimization Services",
  description:
    "Dominate Google search results with Looksbay's technical Squarespace SEO services. We audit site architecture, fix indexing issues, implement JSON-LD schema, and guarantee 90+ Core Web Vitals PageSpeed.",
  keywords: [
    "squarespace seo expert",
    "best squarespace seo services",
    "hire squarespace seo specialist",
    "squarespace site speed optimization",
    "squarespace core web vitals fix",
    "squarespace schema markup implementation",
    "squarespace google search console setup",
    "fix squarespace indexing issues",
    "squarespace on-page seo audit",
    "squarespace local seo agency",
    "squarespace sitemap configuration",
    "organic traffic growth squarespace",
    "squarespace metadata and canonical tags optimization",
    "squarespace image optimization for seo",
  ],
  alternates: {
    canonical: "/services/squarespace-seo",
  },
  openGraph: {
    title: "Enterprise Squarespace SEO & Speed Optimization | Looksbay Studio",
    description:
      "Transform your Squarespace website into an organic traffic engine. Guaranteed 90+ mobile PageSpeed and proven page-one Google rankings.",
    url: "https://www.looksbay.com/services/squarespace-seo",
    type: "website",
    images: [
      {
        url: "/images/service-seo.jpg",
        width: 1200,
        height: 630,
        alt: "Squarespace Technical SEO and Core Web Vitals Optimization by Looksbay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Squarespace SEO & Core Web Vitals Specialist | Looksbay Studio",
    description:
      "Proven search engine optimization and speed architecture engineered exclusively for Squarespace 7.1.",
    images: ["/images/service-seo.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.looksbay.com/services/squarespace-seo#service",
  name: "Squarespace Technical SEO & Core Web Vitals Optimization",
  serviceType: "Search Engine Optimization",
  description:
    "Comprehensive technical SEO audits, Core Web Vitals speed tuning, structured data schemas, and indexing resolution for Squarespace websites.",
  provider: {
    "@type": "Organization",
    name: "Looksbay Studio",
    url: "https://www.looksbay.com",
    logo: "https://www.looksbay.com/assets/favicon.png",
  },
  areaServed: "Worldwide",
  offers: {
    "@type": "Offer",
    price: "2400",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://www.looksbay.com/services/squarespace-seo",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can a Squarespace website actually rank on page one of Google for competitive keywords?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, absolutely. Google ranks content and technical user experience, not CMS brand names. Squarespace 7.1 provides clean HTML5 output, automated sitemaps, and SSL. When combined with Looksbay's structured JSON-LD schemas, strict H1-H3 heading hierarchies, Core Web Vitals optimization, and keyword-targeted content silos, Squarespace sites consistently outrank WordPress competitors.",
      },
    },
    {
      "@type": "Question",
      name: "How does Looksbay resolve slow Core Web Vitals (LCP, FID/INP, CLS) on Squarespace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We audit and compress all raster images into lightweight WebP formats below 200KB, eliminate unminified render-blocking scripts, remove unused third-party tracking pixels, inject preconnect/dns-prefetch directives, and adjust Fluid Engine section structures to eradicate Cumulative Layout Shift (CLS).",
      },
    },
    {
      "@type": "Question",
      name: "How do you diagnose and fix Google Search Console indexing and coverage errors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We conduct a complete 100% URL crawl using Screaming Frog to identify orphaned pages, soft 404s, redirect loops, and canonical mismatches. We then configure XML sitemap submissions in Search Console, apply 301 URL mappings in Squarespace's Developer Tools, and verify correct noindex tags on internal search/checkout paths.",
      },
    },
    {
      "@type": "Question",
      name: "What structured data (JSON-LD schema) do you implement on Squarespace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We inject rich Schema.org JSON-LD markups tailored to your business: Organization, LocalBusiness (with geo-coordinates and opening hours), ProfessionalService, Article, Product (with price and review ratings), BreadcrumbList, and FAQPage schemas, qualifying your site for Google Rich Snippets.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between On-Page SEO and Technical SEO on Squarespace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Technical SEO focuses on server response times, Core Web Vitals, crawlability, XML sitemaps, canonical tags, and schema. On-Page SEO optimizes user-facing elements: keyword research, semantic heading placement, image alt attributes, internal linking architecture, and conversion-focused copy.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to see organic search ranking improvements after your audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Technical crawl and PageSpeed improvements are immediate upon deployment (3–5 business days). Organic keyword rankings and traffic upticks typically manifest within 3 to 8 weeks as Google re-indexes the optimized URLs and recognizes enhanced user experience signals.",
      },
    },
  ],
};

const pillars = [
  {
    icon: Database,
    title: "1. Technical Architecture & Crawlability",
    description:
      "Eliminating indexing roadblocks. We audit XML sitemaps, configure canonical tags, resolve soft 404 errors, clean up robots directives, and map 301 redirects.",
    deliverables: ["XML Sitemap Verification", "301 Redirect Architecture", "Search Console Indexing", "Canonical Tag Scrutiny"],
  },
  {
    icon: SlidersHorizontal,
    title: "2. Semantic On-Page & Schema Hierarchy",
    description:
      "Aligning content with high-intent search queries. We structure proper single H1s, keyword-tuned H2/H3 subheadings, image alt attributes, and JSON-LD Rich Snippet schemas.",
    deliverables: ["JSON-LD Schema Markup", "Semantic Heading Audit", "Keyword Silo Mapping", "Image Alt & OpenGraph Meta"],
  },
  {
    icon: Gauge,
    title: "3. Core Web Vitals & Next-Gen Speed",
    description:
      "Transforming slow sites into 90+ PageSpeed flagships. We compress images to WebP, defer heavy third-party scripts, and eliminate layout shifts (CLS).",
    deliverables: ["LCP Under 1.8s Guarantee", "Zero Cumulative Layout Shift", "WebP Asset Compression", "Render-Blocking Script Removal"],
  },
  {
    icon: Globe,
    title: "4. Local SEO & Authority Signals",
    description:
      "Dominating regional searches and Google Map 3-Packs. Geotagged schema implementation, Google Business Profile synchronization, and localized landing pages.",
    deliverables: ["Google Local 3-Pack Optimization", "LocalBusiness JSON-LD", "Citation Consistency", "Service Area Landing Pages"],
  },
];

const benchmarkComparison = [
  {
    metric: "Largest Contentful Paint (LCP)",
    industryAvg: "4.2s (Poor / Amber)",
    looksbayScore: "1.4s (Good / Fast)",
    googleTarget: "Under 2.5s",
  },
  {
    metric: "Interaction to Next Paint (INP)",
    industryAvg: "380ms (Sluggish)",
    looksbayScore: "48ms (Ultra-Responsive)",
    googleTarget: "Under 200ms",
  },
  {
    metric: "Cumulative Layout Shift (CLS)",
    industryAvg: "0.28 (Shifty Elements)",
    looksbayScore: "0.01 (Rock Solid)",
    googleTarget: "Under 0.10",
  },
  {
    metric: "Mobile Lighthouse Performance",
    industryAvg: "38 / 100",
    looksbayScore: "94–98 / 100",
    googleTarget: "90+ (Green)",
  },
  {
    metric: "Structured Schema Types",
    industryAvg: "0–1 (Default Basic)",
    looksbayScore: "5+ Rich JSON-LD Schemas",
    googleTarget: "Rich Snippet Eligible",
  },
];

export default function SquarespaceSeoPage() {
  return (
    <div className="w-full bg-[#fbfbfd]">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-gradient-to-b from-white via-[#f5f8ff] to-[#fbfbfd] px-6 pt-20 pb-16 tablet:pt-28 tablet:pb-24">
        <div className="site-container relative z-10 max-w-[1020px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0077ED]/20 bg-[#0077ED]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0077ED] mb-6">
            <Search size={14} />
            Data-Driven Search Engine Architecture
          </div>

          <h1 className="text-[clamp(34px,4.8vw,64px)] font-black tracking-[-0.035em] text-[#1D1D1F] leading-[1.08] uppercase">
            Enterprise Squarespace SEO &{" "}
            <span className="apple-gradient-heading block mt-1">
              Core Web Vitals Optimization
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[720px] text-lg sm:text-xl text-[#515154] leading-relaxed">
            Stop losing qualified commercial traffic to competitors. We resolve indexing errors,
            implement advanced Schema.org structured data, and tune Core Web Vitals to guarantee
            page-one Google dominance.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?project=Technical+SEO"
              className="inline-flex items-center gap-2 rounded-full bg-[#0077ED] px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-[#0062C4] hover:shadow-lg active:scale-95"
            >
              <span>Request Technical SEO Audit</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-8 py-4 text-base font-semibold text-[#1D1D1F] shadow-xs transition hover:bg-[#F5F5F7]"
            >
              <span>Explore All Services</span>
            </Link>
          </div>

          {/* Guaranteed Badges */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-black/[0.06] pt-10 text-left">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#0077ED]">90+ Score</p>
              <p className="text-xs text-[#86868B] uppercase font-semibold mt-1">
                Mobile PageSpeed Guarantee
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#1D1D1F]">100%</p>
              <p className="text-xs text-[#86868B] uppercase font-semibold mt-1">
                White-Hat Technical SEO
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#0077ED]">Rich Snippet</p>
              <p className="text-xs text-[#86868B] uppercase font-semibold mt-1">
                Schema.org Verification
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#1D1D1F]">3–5 Days</p>
              <p className="text-xs text-[#86868B] uppercase font-semibold mt-1">
                Fast Turnaround Time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Pillar SEO Framework */}
      <section className="py-20 tablet:py-28">
        <div className="site-container">
          <div className="mx-auto mb-16 max-w-[760px] text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Our Proven Methodology
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.8vw,48px)] font-black tracking-tight text-[#1D1D1F]">
              The 4-Pillar Squarespace SEO Engine
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#6E6E73] leading-relaxed">
              We don&apos;t just tweak meta descriptions. We rebuild your site&apos;s technical foundation to satisfy
              Google&apos;s strictest algorithmic ranking factors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-[24px] border border-black/[0.08] bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0077ED]/40 hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-[#0077ED]/10 text-[#0077ED]">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">{pillar.title}</h3>
                    <p className="mt-3 text-base text-[#56555d] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-6 border-t border-black/[0.06]">
                    {pillar.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs font-semibold text-[#1D1D1F]">
                        <CheckCircle2 size={15} className="text-[#0077ED] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benchmark Comparison Table */}
      <section className="border-y border-black/[0.06] bg-white py-20 tablet:py-28">
        <div className="site-container max-w-[1020px]">
          <div className="mx-auto mb-14 text-center max-w-[700px]">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Measurable Performance Metrics
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.5vw,46px)] font-black tracking-tight text-[#1D1D1F]">
              Core Web Vitals: Before vs. After Looksbay
            </h2>
            <p className="mt-3 text-base text-[#6E6E73]">
              See how our technical speed engineering outpaces default Squarespace templates and meets
              Google&apos;s highest performance standards.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-black/[0.08] bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="border-b border-black/[0.08] bg-[#F5F5F7]">
                  <th className="p-4 sm:p-5 font-bold text-[#1D1D1F]">Core Performance Metric</th>
                  <th className="p-4 sm:p-5 font-bold text-[#86868B]">Industry Squarespace Average</th>
                  <th className="p-4 sm:p-5 font-bold text-[#0077ED]">Looksbay Optimized Score</th>
                  <th className="p-4 sm:p-5 font-bold text-[#1D1D1F]">Google Green Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06]">
                {benchmarkComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FBFBFC] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-[#1D1D1F]">{row.metric}</td>
                    <td className="p-4 sm:p-5 text-[#86868B]">{row.industryAvg}</td>
                    <td className="p-4 sm:p-5 font-bold text-[#0077ED] bg-[#0077ED]/5">
                      {row.looksbayScore}
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-600 font-semibold">{row.googleTarget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Technical FAQ Accordion */}
      <section className="bg-[#fbfbfd] py-20 tablet:py-28">
        <div className="site-container max-w-[880px]">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Frequently Asked Questions
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.5vw,44px)] font-black tracking-tight text-[#1D1D1F]">
              Squarespace SEO & Speed FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-black/[0.08] bg-white p-6 transition-colors open:shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base sm:text-lg font-bold text-[#1D1D1F]">
                  <span>{faq.name}</span>
                  <span className="ml-4 flex size-7 shrink-0 items-center justify-center rounded-full bg-black/5 text-[#1D1D1F] transition-transform duration-200 group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#56555d] border-t border-black/[0.06] pt-4">
                  {faq.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </div>
  );
}
