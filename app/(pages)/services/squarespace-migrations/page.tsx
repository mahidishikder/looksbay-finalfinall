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
    "Figma to Squarespace conversion",
    "WordPress to Squarespace migration",
    "Wix to Squarespace redesign",
    "Webflow to Squarespace migration",
    "Shopify to Squarespace transfer",
    "Squarespace Acuity scheduling setup",
    "Squarespace Momence booking integration",
    "Squarespace Member Areas setup",
    "Squarespace email marketing setup",
    "Squarespace newsletter integration",
    "Zapier integration with Squarespace",
    "Stripe checkout Squarespace",
    "PayPal gateway Squarespace",
    "Google Analytics 4 Squarespace setup",
    "Meta pixel setup on Squarespace",
    "Squarespace domain connection expert",
    "Custom form builder Squarespace",
    "Squarespace CRM connection",
    "Squarespace multi-language setup",
    "Third-party widget integration Squarespace",
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
    title: "Squarespace Site Migrations & Integrations | Looksbay Studio",
    description:
      "Figma to Squarespace, WordPress to Squarespace, and third-party tech integrations.",
    images: ["/images/service-custom-design.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.looksbay.com/services/squarespace-migrations#service",
  name: "Squarespace Platform Migration & Technical Integration Services",
  serviceType: "Website Migration & Platform Integration",
  description:
    "Full-service website migration to Squarespace 7.1 Fluid Engine with 301 URL redirect mapping, database extraction, Acuity scheduling, Member Areas, Stripe checkout, GA4, and CRM automation.",
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
      name: "How do you set up Acuity Scheduling, Momence, and Member Areas on Squarespace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We configure end-to-end booking funnels for Acuity and Momence including custom calendar styling, intake forms, automated SMS/email reminders, and payment gateways. For Member Areas, we build gated content paywalls with recurring subscription billing.",
      },
    },
    {
      "@type": "Question",
      name: "Can we connect Google Analytics 4, Meta Pixel, and Zapier to Squarespace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We configure server-verified Google Analytics 4, Meta Pixel (Facebook Pixel), Google Tag Manager, and Zapier or Make.com webhooks to push form submissions directly to your CRM (HubSpot, Salesforce, ActiveCampaign).",
      },
    },
    {
      "@type": "Question",
      name: "Can you handle custom domains, multi-language setups, and third-party widgets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We handle custom DNS and domain transfers (GoDaddy, Namecheap, Cloudflare), set up subdirectories for multi-language localization (Weglot integration), and embed third-party interactive widgets, custom forms, and dynamic calculators.",
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

      {/* Enterprise Integrations & Setup Matrix (Keywords 71-85) */}
      <section className="border-t border-black/[0.06] bg-[#f5f5f7]/60 py-20 tablet:py-28">
        <div className="site-container">
          <div className="mx-auto mb-16 max-w-[760px] text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Ecosystem & Technical Integrations
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.8vw,48px)] font-black tracking-tight text-[#1D1D1F]">
              Seamless Third-Party Connections
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#515154]">
              We connect Squarespace to your entire operational stack—eliminating silos and automating workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Acuity & Momence Scheduling",
                desc: "Full booking system setup with custom CSS calendar styling, automated intake questionnaires, and SMS reminders.",
                badge: "Scheduling",
              },
              {
                title: "Squarespace Member Areas",
                desc: "Monetize exclusive courses, video libraries, and client portals with recurring paywalls and gated access.",
                badge: "Memberships",
              },
              {
                title: "Stripe & PayPal Checkout",
                desc: "Global payment gateway integration with Apple Pay, Google Pay, Klarna, Afterpay, and multicurrency support.",
                badge: "Commerce",
              },
              {
                title: "Zapier & CRM Automations",
                desc: "Automated webhook pipes routing leads into HubSpot, Salesforce, ActiveCampaign, or Notion without manual entry.",
                badge: "Automation",
              },
              {
                title: "GA4 & Meta Pixel Setup",
                desc: "Server-side and client-side conversion event tracking, Google Tag Manager containers, and eCommerce attribution.",
                badge: "Analytics",
              },
              {
                title: "Domain & DNS Architecture",
                desc: "Zero-downtime domain connections from GoDaddy, Namecheap, or Cloudflare with SSL 2048-bit validation.",
                badge: "Infrastructure",
              },
              {
                title: "Custom Forms & Calculators",
                desc: "Multi-step interactive form builders, price estimation calculators, and client file upload integrations.",
                badge: "Forms",
              },
              {
                title: "Multi-Language & Global SEO",
                desc: "Weglot and Bablic integration with localized URL subdirectories, hreflang tags, and international currency switchers.",
                badge: "Localization",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-xs transition-all hover:border-[#0077ED]/30 hover:shadow-md"
              >
                <span className="inline-block rounded-md bg-[#0077ED]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0077ED] mb-3">
                  {item.badge}
                </span>
                <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#515154] leading-relaxed">{item.desc}</p>
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
