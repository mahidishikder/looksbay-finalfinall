import type { Metadata } from "next";
import Link from "next/link";
import {
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Layers,
  Sparkles,
} from "lucide-react";
import { NewsletterCTA } from "@/app/shared/components/site-components";

export const metadata: Metadata = {
  title: "Squarespace Migrations — WordPress, Wix, Webflow & Figma to Squarespace",
  description:
    "Seamless platform migrations into Squarespace 7.1. We transfer content from WordPress, Wix, Shopify, Webflow, and Figma with 100% SEO ranking preservation and zero downtime.",
  keywords: [
    "figma to squarespace conversion",
    "wordpress to squarespace migration",
    "wix to squarespace redesign",
    "webflow to squarespace transfer",
    "shopify to squarespace migration",
    "squarespace acuity scheduling setup",
    "squarespace momence booking integration",
    "squarespace member areas configuration",
    "stripe checkout squarespace",
    "zapier squarespace automation",
    "google analytics 4 squarespace integration",
    "meta pixel setup on squarespace",
  ],
  alternates: {
    canonical: "/services/squarespace-migrations",
  },
  openGraph: {
    title: "Zero-Downtime Platform Migrations to Squarespace 7.1 | Looksbay",
    description:
      "Move from WordPress, Wix, or Shopify to Squarespace without losing Google search rankings or backlinks.",
    url: "https://www.looksbay.com/services/squarespace-migrations",
    type: "website",
    images: [
      {
        url: "/images/service-custom-design.jpg",
        width: 1200,
        height: 630,
        alt: "Squarespace Site Migration by Looksbay Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Squarespace Site Migrations | Looksbay Studio",
    description:
      "Figma to Squarespace, WordPress to Squarespace, and Wix to Squarespace migrations.",
    images: ["/images/service-custom-design.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.looksbay.com/services/squarespace-migrations#service",
  name: "Squarespace Platform Migration Services",
  serviceType: "Website Migration & Platform Transfer",
  description:
    "Full-service website migration to Squarespace 7.1 Fluid Engine with 301 URL redirect mapping, database extraction, and 100% SEO link equity preservation.",
  provider: {
    "@type": "Organization",
    name: "Looksbay Studio",
    url: "https://www.looksbay.com",
    logo: "https://www.looksbay.com/assets/favicon.png",
  },
  areaServed: "Worldwide",
  offers: {
    "@type": "Offer",
    price: "2800",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://www.looksbay.com/services/squarespace-migrations",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Will our website lose Google SEO rankings when migrating from WordPress to Squarespace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, not when executed by Looksbay. We conduct a pre-migration crawl of every single URL on your existing WordPress site. We then configure 1-to-1 301 permanent redirect mappings inside Squarespace's Developer Tools, replicate your meta title hierarchies, and re-submit your XML sitemap to Google Search Console to preserve 100% of your search link equity.",
      },
    },
    {
      "@type": "Question",
      name: "Can you convert pixel-perfect Figma designs into custom Squarespace 7.1 Fluid Engine sites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We translate Figma files directly into custom Squarespace sections using Fluid Engine 24-column grids, bespoke typography styles, and custom CSS interactions, maintaining exact spacing, letter-spacing, and responsiveness across all devices.",
      },
    },
    {
      "@type": "Question",
      name: "Can our blog posts, images, and author archives be transferred to Squarespace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We handle automated and manual data migrations for blog articles, featured images, categories, tags, publication dates, and author attributions, ensuring your content history and organic keywords are safely imported.",
      },
    },
    {
      "@type": "Question",
      name: "Can we integrate custom bookings (Acuity / Momence) and analytics (GA4 / Meta Pixel)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We configure complete scheduling funnels (Acuity, Momence, Mindbody), connect Stripe for payments, configure Zapier CRM automations, and inject verified Google Analytics 4 and Meta Pixel tracking with custom event conversion triggers.",
      },
    },
    {
      "@type": "Question",
      name: "Why should we move away from WordPress or Wix to Squarespace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Squarespace eliminates the endless plugin updates, PHP crashes, database bloat, and hosting security vulnerabilities common with WordPress. You get an all-in-one, cloud-hosted platform with 99.9% uptime, built-in SSL, intuitive visual drag-and-drop editing, and zero maintenance headaches.",
      },
    },
  ],
};

const migrationPaths = [
  {
    title: "WordPress to Squarespace",
    desc: "Escape plugin bloat, security vulnerabilities, and server hosting fees with an effortless, modern Squarespace 7.1 migration.",
    highlights: ["Complete Blog & Media Transfer", "301 Redirect Mapping", "Plugin Replacement Architecture", "Zero Downtime Cutover"],
  },
  {
    title: "Figma to Squarespace 7.1",
    desc: "Transform your bespoke UI/UX designs into a living, breathing website with pixel-perfect Fluid Engine precision.",
    highlights: ["Pixel-Perfect Layouts", "Custom CSS Micro-Interactions", "Fluid Typography Hierarchy", "Independent Mobile Staging"],
  },
  {
    title: "Wix to Squarespace",
    desc: "Upgrade from chaotic, non-standard code to editorial-grade typography, clean HTML5 semantics, and fast PageSpeed.",
    highlights: ["Clean Layout Normalization", "Speed & Core Web Vitals Boost", "URL Canonical Preservation", "Modern Aesthetic Overhaul"],
  },
  {
    title: "Shopify / Webflow to Squarespace",
    desc: "Consolidate your brand storytelling, courses, scheduling, and digital commerce under one intuitive platform.",
    highlights: ["Product Catalog Migration", "Acuity Booking Integration", "Stripe Checkout Setup", "Member Area Paywalls"],
  },
];

export default function MigrationsPage() {
  return (
    <div className="w-full bg-[#fbfbfd]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-gradient-to-b from-white via-[#f7f9fd] to-[#fbfbfd] px-6 pt-20 pb-16 tablet:pt-28 tablet:pb-24">
        <div className="site-container relative z-10 max-w-[1020px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0077ED]/20 bg-[#0077ED]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0077ED] mb-6">
            <RefreshCw size={14} />
            Zero-Downtime Platform Migrations
          </div>

          <h1 className="text-[clamp(34px,4.8vw,64px)] font-black tracking-[-0.035em] text-[#1D1D1F] leading-[1.08] uppercase">
            WordPress, Wix & Figma to{" "}
            <span className="apple-gradient-heading block mt-1">
              Squarespace 7.1 Migration
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[720px] text-lg sm:text-xl text-[#515154] leading-relaxed">
            Move to an intuitive, zero-maintenance platform without sacrificing your hard-earned Google
            rankings, organic traffic, or customer data.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?project=Platform+Migration"
              className="inline-flex items-center gap-2 rounded-full bg-[#0077ED] px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-[#0062C4] hover:shadow-lg active:scale-95"
            >
              <span>Plan Your Migration</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-8 py-4 text-base font-semibold text-[#1D1D1F] shadow-xs transition hover:bg-[#F5F5F7]"
            >
              <span>View All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Migration Paths Grid */}
      <section className="py-20 tablet:py-28">
        <div className="site-container">
          <div className="mx-auto mb-16 max-w-[740px] text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Specialized Migration Paths
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.8vw,48px)] font-black tracking-tight text-[#1D1D1F]">
              Seamless Transitions to Squarespace
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {migrationPaths.map((path, idx) => (
              <div
                key={idx}
                className="rounded-[24px] border border-black/[0.08] bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0077ED]/40 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">{path.title}</h3>
                  <p className="mt-3 text-base text-[#56555d] leading-relaxed">{path.desc}</p>
                </div>
                <div className="mt-8 space-y-2.5 pt-6 border-t border-black/[0.06]">
                  {path.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1D1D1F]">
                      <CheckCircle2 size={16} className="text-[#0077ED] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration FAQ */}
      <section className="border-t border-black/[0.06] bg-white py-20 tablet:py-28">
        <div className="site-container max-w-[880px]">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Migration Questions Answered
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.5vw,44px)] font-black tracking-tight text-[#1D1D1F]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-black/[0.08] bg-[#FBFBFC] p-6 transition-colors open:bg-white open:shadow-sm"
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
